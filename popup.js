$(function(){
    chrome.storage.sync.get(['tasks'],function(allTasks){
        if(allTasks.tasks && allTasks.tasks.length){
            $('#task').text(allTasks.tasks[allTasks.tasks.length-1]);
        }
    });
    $('#doTask').click(function(){
        chrome.storage.sync.get(['tasks'],function(allTasks){
            var prevTasks=[];
            if(allTasks.tasks) prevTasks=allTasks.tasks;
            var newTask = $('#newTask').val();
            if(newTask){
                prevTasks.push(newTask);
            }
            console.log(allTasks.tasks);
            chrome.storage.sync.set({'tasks':prevTasks});
            $('#task').text(newTask);
        });
    });

    $('#reset').click(function(){
        chrome.storage.sync.set({'tasks':[]});
        $('#task').text('');
        $('#newTask').val('');
    });
});

/*
$(function(){
    chrome.storage.sync.get(['tot','maxBudget'], function(budget) {
        $('#total').text(budget.tot);
        $('#limit').text(budget.maxBudget);
    });

    $('#reset').click(function(){
        chrome.storage.sync.set({'tot':0});
        $('#total').text('0'); 
        var notifOptions = {
            type:'basic',
            iconUrl: 'money48.png',
            title:'Total reset',
            message:'Total amount spend has been reset to 0'
        };
        chrome.notifications.create('resetInfo',notifOptions);
    })

    $('#spent').click(function(){
        chrome.storage.sync.get(['tot','maxBudget'], function(budget) {
            // console.log('Value currently is ' + result.key);
            var newTot=0;
            if(budget.tot){
                newTot+=parseInt(budget.tot);
            }
            var added = $('#amount').val();
            if(added){
                newTot+= parseInt(added);
            }
            chrome.storage.sync.set({'tot': newTot},function(){
                if(added && newTot>=budget.maxBudget){  
                    console.log("crossed");
                    var notifOptions = {
                        type:'basic',
                        iconUrl: 'money48.png',
                        title:'Limit reached',
                        message:'You have spent limit amount'
                    };
                    chrome.notifications.create('limitWarning',notifOptions);
                }
            });
            $('#total').text(newTot);
            $('#amount').val('');
        });
    });
}); 
*/