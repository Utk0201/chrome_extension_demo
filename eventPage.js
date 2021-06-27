var contextMenuItem = {
    "id": "to_spend",
    "title": "SpendMoney",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (data) {
    if (data.menuItemId === "to_spend" && data.selectionText) {
        console.log("Selected");
        var selectedData = data.selectionText;
        if (parseInt(selectedData) == selectedData) {
            chrome.storage.sync.get(['tot', 'maxBudget'], function (budget) {
                var newTot = 0;
                if (budget.tot) {
                    newTot += parseInt(budget.tot);
                }
                newTot += parseInt(selectedData);
                chrome.storage.sync.set({ 'tot': newTot }, function () {
                    if (newTot >= budget.maxBudget) {
                        console.log("crossed");
                        var notifOptions = {
                            type: 'basic',
                            iconUrl: 'money48.png',
                            title: 'Limit reached',
                            message: 'You have spent limit amount'
                        };
                        chrome.notifications.create('limitWarning', notifOptions);
                    }
                })
            })
        }
    }
});