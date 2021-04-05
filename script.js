let code = `
const regNo = '';
const pass = '';
openPage();
setTimeout(() => {
    document.querySelector("#uname").value = regNo;
    document.querySelector("#passwd").value = pass;
    document.querySelector("#captcha").click();
},1000);
setInterval(function() {
    //location.reload()
    doRefreshCaptcha();
},14 * 60 * 1000);`;
let script = document.createElement('script');
script.textContent = code;
(document.head || document.documentElement).appendChild(script);