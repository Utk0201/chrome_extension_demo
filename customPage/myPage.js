// function setup(){
//     createCanvas(200,200);
//     background(0);
// }

$(function(){
    $('h1').click(function(){
        console.log("I am clicked!!!");
    });
    $('.userForms').hide();
    $('#toggleForm').click(function(){
        console.log("I am also clicked!!!");
        $('.userForms').slideToggle( "slow", function() {
            // Animation complete.
          });
    });
});
