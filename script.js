browser.storage.local.get(['regno', 'pass']).then((items)=>{
    let code = `
    openPage();
    setTimeout(() => {
        document.querySelector("#uname").value = '${items.regno}';
        document.querySelector("#passwd").value = '${items.pass}';
        document.querySelector("#captcha").click();
    },1000);
    setInterval(function() {
        doRefreshCaptcha();
    },14 * 60 * 1000);`;
    let script = document.createElement('script');
    script.textContent = code;
    (document.head || document.documentElement).appendChild(script);
});