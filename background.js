console.log('background running from bkg.js !!');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  // if (message === 'get-user-data') {
  //   sendResponse(user);
  // }
  if (message.from === "popup") {
    // console.log("received popup msg");
    // chrome.tabs.create({url: "https://www.stackoverflow.com", active: false }, tab =>{}); 
    chrome.tabs.create({
      url: 'customPage/myPage.html'
    });
  }
});


"use strict";

/* global chrome, URL */

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    if (!Array.isArray(local.blocked)) {
      chrome.storage.local.set({ blocked: [] });
    }

    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({ enabled: false });
    }
  });

});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith("http")) {
    return;
  }

  const hostname = new URL(url).hostname;

  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked) && enabled && blocked.find(domain => hostname.includes(domain))) {
      chrome.tabs.remove(tabId);
    }
  });
});

setInterval(() => {
  chrome.storage.sync.get("setHr", function (result1) {
    chrome.storage.sync.get("setMin", function (result2) {
      chrome.storage.sync.get("setSec", function (result3) {
        // console.log("Hours is ", result1.setHr);
        // console.log("Minutes is ", result2.setMin);
        // console.log("Seconds is ", result3.setSec);
        var curTime = new Date();
        // console.log(curTime.getHours());
        // console.log(curTime.getMinutes());
        // console.log(curTime.getSeconds());
        var cmp1 = result1.setHr + result2.setMin + result3.setSec;
        // var cmp2 = curTime.getHours().toString() + curTime.getMinutes().toString();
        var cmp2;
        if (curTime.getHours() < 10) {
          cmp2 = "0" + curTime.getHours().toString();
        }
        else cmp2 = curTime.getHours().toString();
        /////////////////////////////////////////////
        if (curTime.getMinutes() < 10) {
          cmp2 += "0" + curTime.getMinutes().toString();
        }
        else cmp2 += curTime.getMinutes().toString();
        ////////////////////////////////////////////
        if (curTime.getSeconds() < 10) {
          cmp2 += "0" + curTime.getSeconds().toString();
        }
        else cmp2 += curTime.getSeconds().toString();
        ///////////////////////////////////////////
        // console.log(cmp1);
        // console.log(cmp2);
        if (cmp1 == cmp2) {
          console.log("Showing notification!!");
          var notifOptions = {
            type: 'basic',
            iconUrl: '../img48.png',
            title: "limit reached",
            message: "Timer reached!!"
          };
          chrome.notifications.create('timerNotif', notifOptions);
          chrome.storage.sync.set({ setHr: -1 });
          chrome.storage.sync.set({ setMin: -1 });
          chrome.storage.sync.set({ setSec: -1 });
        }
      });
    });
  });
}, 1000);

var myState;    //  1->work ; 0->break
var workInterval;
var breakInterval;

function updateStuff() {
  if (myState === 1) {
    chrome.storage.sync.get("workTimeLeft", function (result) {
      console.log(result.workTimeLeft);
      if(result.workTimeLeft<=0){
        clearInterval(workInterval);
        clearInterval(breakInterval);
        return;
      }
      chrome.storage.sync.set({ "workTimeLeft": result.workTimeLeft - 1 }, () => {
        console.log("Work time is updated to ", result.workTimeLeft - 1);
      });
    })
  }
  else if (myState === 0) {
    chrome.storage.sync.get("breakTimeLeft", function (result) {
      console.log(result.breakTimeLeft);
      if(result.breakTimeLeft<=0){
        clearInterval(workInterval);
        clearInterval(breakInterval);
        return;
      }
      chrome.storage.sync.set({ "breakTimeLeft": result.breakTimeLeft - 1 }, () => {
        console.log("Break time is updated to ", result.breakTimeLeft - 1);
      });
    });
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "start doing work") {
    clearInterval(workInterval);
    clearInterval(breakInterval);
    myState = 1;
    workInterval = setInterval(updateStuff, 1000);
    sendResponse("fine1");
  }
  else if (message === "take rest") {
    clearInterval(workInterval);
    clearInterval(breakInterval);
    myState = 0;
    breakInterval = setInterval(updateStuff, 1000);
    // myState = 0;
    sendResponse("fine2");
  }
  else if (message === "paused") {
    myState = -1;
    clearInterval(workInterval);
    clearInterval(breakInterval);
    sendResponse("fine3");
  }
});


