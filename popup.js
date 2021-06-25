console.log('popup.js Successfully running');

var toChange = "laptop.jpg";

var prevImages = document.getElementsByTagName('img');

for(img of prevImages){
    // console.log(img.src);
    var url = chrome.extension.getURL(toChange);
    img.src=url;
    console.log(url);
}