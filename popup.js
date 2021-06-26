$(function(){
    chrome.storage.sync.get(['tot','maxBudget'], function(budget) {
        $('#total').text(budget.tot);
        $('#limit').text(budget.maxBudget);
    });

    $('#reset').click(function(){
        chrome.storage.sync.set({'tot':0});
        $('#total').text('0'); 
    })

    $('#spent').click(function(){
        chrome.storage.sync.get('tot', function(budget) {
            // console.log('Value currently is ' + result.key);
            var newTot=0;
            if(budget.tot){
                newTot+=parseInt(budget.tot);
            }
            var added = $('#amount').val();
            if(added){
                newTot+= parseInt(added);
            }
            chrome.storage.sync.set({'tot': newTot});
            $('#total').text(newTot);
            $('#amount').val('');
        });
    });
}); 