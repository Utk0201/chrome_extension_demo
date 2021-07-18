$(function () {
  $('h1').click(function () {
  });
  $('.todo-forms').hide();
  $('#toggle-form').click(function () {
    $('.todo-forms').slideToggle("slow", function () { });
  });
});

$(function () {

  $('h1').click(function () {
    // console.log("I am clicked!!!");
  });

  $('.userForms1').hide();

  $('#toggleForm1').click(function () {
    // console.log("I am also clicked!!!");

    $('.userForms1').slideToggle("slow", function () {




    });

  });

});
$(function () {

  $('h1').click(function () {
    console.log("I am clicked!!!");
  });

  $('.userForms2').hide();

  $('#toggleForm2').click(function () {
    console.log("I am also clicked!!!");

    $('.userForms2').slideToggle("slow", function () {




    });

  });

});

document.addEventListener("DOMContentLoaded", getTodos);
const todoButton = document.querySelector(".todo-button");
const todoInput = document.querySelector("#add-task");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);

function addTodo(e) {
  //Prevent natural behaviour
  e.preventDefault();
  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("a-task");
  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  //Save to local - do this last
  //Save to local
  if (!saveLocalTodos(todoInput.value)) return;
  //
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  // todoDiv.appendChild(completedButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  // my lines
  const btns = document.createElement("div");
  btns.classList.add("edit-delete-buttons");
  btns.appendChild(completedButton);
  btns.appendChild(trashButton);
  // my lines
  // todoDiv.appendChild(trashButton);
  todoDiv.appendChild(btns);
  //attach final Todo
  todoList.appendChild(todoDiv);
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // check whether this task has occurred before
  for (var task of todos) {
    if (task.taskName === todo) {
      const tmp = document.getElementsByTagName('h2')[0];
      $('.form-heading').fadeToggle("fast", function () {
        tmp.innerHTML = '<h2> Please add a different task</h2>';
      });
      $('.form-heading').fadeToggle("fast", function () {
      });
      $('.form-heading').fadeToggle(2000, function () {
        tmp.innerHTML = '<h2>Tasks</h2>';
      });
      $('.form-heading').fadeToggle("fast", function () { });;
      console.log("Sorry!! this task has been inserted before!!!");
      return false;
    }
  }
  todos.push({ taskName: todo, taskDone: 0 });
  localStorage.setItem("todos", JSON.stringify(todos));
  return true;
}

function deleteTodo(e) {
  const item = e.target;
  if (item.classList[1] === "fa-trash") {
    const toBeDeleted = e.target.parentElement.parentElement.parentElement;
    removeLocalTodos(toBeDeleted);
    toBeDeleted.remove();
  }
  if (item.classList[1] === "fa-check") {
    const todo = item.parentElement.parentElement.parentElement;
    let toStrike = todo.children[0];
    modifyTask(todo);
    toStrike.classList.toggle("task-done");
  }
}

function modifyTask(todo) {
  //
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todo);
  console.log(todo.innerText);
  for (let task of todos) {
    console.log(task);
    if (task.taskName === todo.innerText) {
      console.log("Yayyy!!!");
      task.taskDone = 1 - task.taskDone;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // const todoIndex = todo.children[0].innerText;
  // todos.splice(todos.indexOf(todoIndex), 1);
  // console.log(todo);
  // console.log(todos);
  // return;
  let newTodos = [];
  for (let aTask of todos) {
    if (aTask.taskName != todo.children[0].innerText) {
      newTodos.push(aTask);
    }
  }
  localStorage.setItem("todos", JSON.stringify(newTodos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("a-task");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.taskName;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    if (todo.taskDone === 1) {
      newTodo.classList.add("task-done");
    }
    // todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    // my lines
    const btns = document.createElement("div");
    btns.classList.add("edit-delete-buttons");
    btns.appendChild(completedButton);
    btns.appendChild(trashButton);
    // my lines
    // todoDiv.appendChild(trashButton);
    todoDiv.appendChild(btns);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

//block
"use strict";

/* global chrome, window, document */

const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

textarea.placeholder = [
  "facebook.com/ ",
  "instagram.com/ ",
  "youtube.com"
].join("\n");

save.addEventListener("click", () => {
  const blocked = textarea.value.split("/ ").map(s => s.trim()).filter(Boolean);

  chrome.storage.local.set({ blocked });
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;

  chrome.storage.local.set({ enabled });
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (!Array.isArray(blocked)) {
      return;
    }

    // blocked
    var value = blocked.join("\r\n"); // display every blocked in new line
    textarea.value = value;

    // enabled
    checkbox.checked = enabled;

    // show controls
    document.body.classList.add("ready");
  });
});

//alarm 
var ac = {
  // (A) INITIALIZE ALARM CLOCK
  init: function () {
    console.log(localStorage.getItem("setHr"));
    console.log(localStorage.getItem("setMin"));
    console.log(localStorage.getItem("setSec"));
    // (A1) GET THE CURRENT TIME - HOUR, MIN, SECONDS
    ac.chr = document.getElementById("chr");
    ac.cmin = document.getElementById("cmin");
    ac.csec = document.getElementById("csec");


    // (A2) CREATE TIME PICKER - HR, MIN, SEC
    ac.thr = ac.createSel(23);
    document.getElementById("tpick-h").appendChild(ac.thr);
    ac.thm = ac.createSel(59);
    document.getElementById("tpick-m").appendChild(ac.thm);
    ac.ths = ac.createSel(59);
    document.getElementById("tpick-s").appendChild(ac.ths);



    // (A3) CREATE TIME PICKER - SET, RESET
    ac.tset = document.getElementById("tset");
    ac.tset.addEventListener("click", ac.set);
    ac.treset = document.getElementById("treset");
    ac.treset.addEventListener("click", ac.reset);

    // (A4) GET ALARM SOUND
    ac.sound = document.getElementById("alarm-sound");

    // (A5) START THE CLOCK
    ac.alarm = null;
    setInterval(ac.tick, 1000);
  },

  // (B) SUPPORT FUNCTION - CREATE SELECTOR FOR HR, MIN, SEC
  createSel: function (max) {
    var selector = document.createElement("select");
    for (var i = 0; i <= max; i++) {
      var opt = document.createElement("option");
      i = ac.padzero(i);
      opt.value = i;
      opt.innerHTML = i;
      selector.appendChild(opt);
    }
    return selector
  },

  // (C) SUPPORT FUNCTION - PREPEND HR, MIN, SEC WITH 0 (IF < 10)
  padzero: function (num) {
    if (num < 10) { num = "0" + num; }
    else { num = num.toString(); }
    return num;
  },

  // (D) UPDATE CURRENT TIME
  tick: function () {
    // (D1) CURRENT TIME
    var now = new Date();
    var hr = ac.padzero(now.getHours());
    var min = ac.padzero(now.getMinutes());
    var sec = ac.padzero(now.getSeconds());
    // // (D2) UPDATE HTML CLOCK
    ac.chr.innerHTML = hr;
    ac.cmin.innerHTML = min;
    ac.csec.innerHTML = sec;
    // var stored = localStorage.getItem("setHr") + localStorage.getItem("setMin") + localStorage.getItem("setSec");
    // let stored;
    // chrome.storage.sync.get("setHr", function(result){
    //   console.log("setHr is ",result.setHr);
    //   stored=result.setHr;
    //   chrome.storage.sync.get("setMin", function(result){
    //     console.log("setMin is ",result.setMin);
    //     stored+=result.setMin;
    //     chrome.storage.sync.get("setSec", function(result){
    //       console.log("setSec is ",result.setSec);
    //       stored+=result.setSec;
    //       console.log("Stored is ",stored);
    //     });
    //   });
    // });
  },

  // (E) SET ALARM
  set: function () {
    //  set values
    console.log("Values are being set");
    // localStorage.setItem("setHr",  ac.thr.value);
    // localStorage.setItem("setMin", ac.thm.value);
    // localStorage.setItem("setSec",  ac.ths.value);
    chrome.storage.sync.set({ setHr: ac.thr.value });
    chrome.storage.sync.set({ setMin: ac.thm.value });
    chrome.storage.sync.set({ setSec: ac.ths.value });
    //  set values
    ac.alarm = ac.thr.value + ac.thm.value + ac.ths.value;
    ac.thr.disabled = true;
    ac.thm.disabled = true;
    ac.ths.disabled = true;
    ac.tset.disabled = true;
    ac.treset.disabled = false;
  },

  // (F) RESET ALARM
  reset: function () {
    //  reset time
    console.log("Values are being set");
    // localStorage.setItem("setHr", -1);
    // localStorage.setItem("setMin", -1);
    // localStorage.setItem("setSec", -1);
    chrome.storage.sync.set({ setHr: -1 });
    chrome.storage.sync.set({ setMin: -1 });
    chrome.storage.sync.set({ setSec: -1 });
    //  reset time

    // remove from chrom.storage
    if (!ac.sound.paused) { ac.sound.pause(); }
    ac.alarm = null;
    ac.thr.disabled = false;
    ac.thm.disabled = false;
    ac.ths.disabled = false;
    ac.tset.disabled = false;
    ac.treset.disabled = true;
  }
};

// (G) START CLOCK ON PAGE LOAD
window.addEventListener("load", ac.init);