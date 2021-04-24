chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message=="run-script"){
		chrome.storage.sync.get(['regno', 'pass', 'vlcodes'], function (items) {
			chrome.tabs.executeScript(null, {
				code: `var regno = '${items.regno}'; var pass = '${items.pass}'`
			}, () => {
				chrome.tabs.executeScript(null, {file: "content.js"});
			});
			console.log(items.vlcodes)
		});
	} else {
		console.log(message);
	}
});
