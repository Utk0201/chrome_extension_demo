$(function(){
    $('#setLimit').click(function(){
        var maxBudget = $('#limit').val();
        chrome.storage.sync.set({'maxBudget':parseInt(maxBudget)});
    });
    $('#resetTot').click(function(){
        chrome.storage.sync.set({'tot':0});
    });
});