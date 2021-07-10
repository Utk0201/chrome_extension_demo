console.log('background running !!');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`
    // if (message === 'get-user-data') {
    //   sendResponse(user);
    // }
    if(message.from==="popup"){
        console.log("received popup msg");
        chrome.tabs.create({url: "https://www.stackoverflow.com", active: false }, tab =>{}); 
    }
});