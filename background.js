// // pass in null if you want the active tab

// // will change every time the tab is changed
// chrome.tabs.onActivated.addListener((tab) => {
//   // pass in the tabid of the current tab
//   chrome.tabs.get(tab.tabId, (currentTab) => {
//     // this will get the current url of the tab you are on
//     const { url } = currentTab;

//     if (/^https:\/\/www\.google/.test(url)) {
//       chrome.tabs.insertCSS(null, { file: "./styles.css" }, () => {
//         console.log("css working");
//       });
//       chrome.tabs.executeScript(null, { file: "./foreground.js" }, () => {
//         console.log("I injected this");
//       });
//     }
//   });
// });

// // this is a listener for a message sent by the content script
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === "check the storage") {
//     sendResponse({ message: "I GOT THE MESSAGE" });
//     chrome.storage.local.get("password", (value) => {
//       console.log(value);
//     });
//   }
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("runnning");
  // will listen for changes to a tab
  const { url } = tab;
  if (url.substr(0, 23) === "https://www.nike.com/t/") {
    // this provides the product's name and sku number separated by /
    const param = url.substr(23);

    const sections = param.split("/");
    const [product, sku] = sections;

    //send message to content script containing product information
    chrome.tabs.sendMessage(tabId, { sku, product }, (response) => {
      if (response) console.log(response);
    });

    chrome.tabs.insertCSS(null, { file: "styles.css" });

    chrome.tabs.executeScript(null, { file: "foreground.js" }, () => {
      console.log("Script executing");
    });
  }
});
