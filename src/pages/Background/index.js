console.log('This is the background page.');
console.log('Put the background scripts here.');
var currentTabUrl

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
    console.log('runtime script run')
  });

chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log('here')
  console.log(activeInfo)
    // how to fetch tab url using activeInfo.tabid
    chrome.tabs.get(activeInfo.tabId, function(tab){
        currentTabUrl = tab.url;
        chrome.tabs.onUpdated.addListener((tabId, tab) => {
          console.log('updatedTab: ' + currentTabUrl)
          
          if (currentTabUrl && (currentTabUrl.includes("https://mail.google.com/") || currentTabUrl.includes("https://inbox.google.com/"))) {
              console.log('tab url is gmail')
          
              chrome.action.setBadgeText({
                  text: 'ON',
              });
          
              console.log('state changed to ON')
            //   chrome.tabs.sendMessage(tabId, {
            //     type: "ON",
            //     currentTabUrl: currentTabUrl,
            // });
          
          } else {
              console.log('tab url is NOT gmail')

              chrome.action.setBadgeText({
                  text: 'OFF',
              });
              
              console.log('state changed to OFF')
          }
      });
        return currentTabUrl
    });
}); 
