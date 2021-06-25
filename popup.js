$(function(){
    $('#spent').click(function(){
        chrome.storage.sync.get('total', function(budget) {
            // console.log('Value currently is ' + result.key);
            var newTot=0;
            if(budget.total){
                newTot+=parseInt(budget.total);
            }
            var added = $('#amount').val();
            if(amount){
                newTot+= parseInt(added);
            }
            chrome.storage.sync.set({'total': newTot});
            $('#total').text(newTot);
            $('#amount').val('');
        });
    });
});