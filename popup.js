chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details.method == "POST") {
            let formData = details.requestBody.formData;
            console.log(formData);
        }
    },
    { urls: [""] },
    ["blocking", "requestBody"]
);