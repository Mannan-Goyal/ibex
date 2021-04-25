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
    document.querySelectorAll('li')[0].addEventListener('click',()=>{
        document.querySelectorAll('li')[0].classList.toggle('is-active');
        document.querySelectorAll('li')[1].classList.toggle('is-active');
        changeDisplay()
    })
    document.querySelectorAll('li')[1].addEventListener('click',()=>{
        document.querySelectorAll('li')[1].classList.toggle('is-active');
        document.querySelectorAll('li')[0].classList.toggle('is-active');
        changeDisplay()
    })
    function changeDisplay(){
        let ul = document.querySelector('.tabs > ul');
        if(ul.querySelector('li').getAttribute('class') === 'is-active'){
            document.querySelector('.login').style.display = 'block';
            document.querySelector('.da').style.display = 'none';
        }
        else{
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.da').style.display = 'block';
        }
    }

    document.querySelector('#sync').addEventListener('click',()=>{
        chrome.storage.sync.get(['vlcodes'], function (items) {
            for (let i = 0; i < items.vlcodes.length; ++i) {
                let sub = items.vlcodes[i].name
                let ethla = items.vlcodes[i].ethla
                for(let j = 0; j < items.vlcodes[i].data.length; ++j){
                    let date = Date.parse(items.vlcodes[i].data[j].date)-Date.now();
                    console.log(date);
                    let tbody = document.querySelector('body > div.da > table > tbody');
                    if(date>0 && date<436800000){
                        let tr = `<tr style="color:red;">
                        <td>${sub}</td>
                        <td>${ethla}</td>
                        <td>${items.vlcodes[i].data[j].title}</td>
                        <td>${items.vlcodes[i].data[j].date}</td>
                        </tr>`;
                        tbody.innerHTML += tr;
                }else{
                    let tr = `<tr>
                    <td>${sub}</td>
                    <td>${ethla}</td>
                    <td>${items.vlcodes[i].data[j].title}</td>
                    <td>${items.vlcodes[i].data[j].date}</td>
                    </tr>`;
                    tbody.innerHTML += tr;
                }
            }
        }});
    })
    document.querySelector('#update').addEventListener('click',()=>{
        window.open('https://vtop.vit.ac.in', '_blank');
    })
});