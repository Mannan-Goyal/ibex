document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(null, function (data) { console.info('Working!') });
    document.getElementById('subm').addEventListener('click', () => {
        let regno = document.querySelector('#regno').value;
        let pass = document.querySelector('#pass').value;
        console.log(regno, pass);
        chrome.storage.sync.set({
            regno: regno,
            pass: pass
        }, function () {
            console.log('Credentials Saved!');
        });
        window.close();
    });
});