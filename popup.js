document.addEventListener('DOMContentLoaded', function () {
    browser.storage.local.get(null).then((data) => { console.info(data) });
    document.getElementById('subm').addEventListener('click', () => {
        let regno = document.querySelector('#regno').value;
        let pass = document.querySelector('#pass').value;
        console.log(regno, pass);
        browser.storage.local.set({
            regno: regno,
            pass: pass
        }).then(()=>console.log('Credentials Saved!'));
        window.close();
    });
});