chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message=="run-script"){
		chrome.storage.sync.get(['regno', 'pass', 'vlcodes','sem'], function (items) {
			chrome.tabs.executeScript(null, {
				code: `let regno = '${items.regno}'; let pass = '${items.pass}'; let sem = '${items.sem}';`
			}, () => {
				chrome.tabs.executeScript(null, {file: "content.js"});
			});
			console.log(items.vlcodes)
		});
	} else {
		console.log(message);
	}
});
