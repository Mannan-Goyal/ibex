document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(null, function (data) { console.info('Working!') });
    document.getElementById('subm').addEventListener('click', () => {
        let regno = document.querySelector('#regno').value;
        let pass = document.querySelector('#pass').value;
        let semester = document.querySelector('select').value;
        console.log(regno, pass);
        chrome.storage.sync.set({
            regno: regno,
            pass: pass,
            sem: semester
        }, function () {
            console.log('Credentials Saved!');
        });
        window.close();
    });
    document.querySelector('#login').addEventListener('click',()=>{
        document.querySelector('#da').classList.add('tab-inact');
        document.querySelector('#login').classList.remove('tab-inact');
        changeDisplay()
    })
    document.querySelector('#da').addEventListener('click',()=>{
        document.querySelector('#da').classList.remove('tab-inact');
        document.querySelector('#login').classList.add('tab-inact');
        changeDisplay()
    })
    function changeDisplay(){
        let ul = document.querySelector('.tabs-container');
        if(ul.querySelector('#da').getAttribute('class').includes('tab-inact')){
            console.log(1)
            document.querySelector('#logindiv').style.display = 'block';
            document.querySelector('#dadiv').style.display = 'none';
        }
        else{
            console.log(2)
            document.querySelector('#logindiv').style.display = 'none';
            document.querySelector('#dadiv').style.display = 'block';
        }
    }

    document.querySelector('#da').addEventListener('click',()=>{
        let temptrash = document.querySelector('#dadiv > div > table > tbody').innerHTML.trim()
        console.log(temptrash)
        if (temptrash!=''){
            return;
        }
        chrome.storage.sync.get(['vlcodes'], function (items) {
            if(items.vlcodes.length !== 0){
                for (let i = 0; i < items.vlcodes.length; ++i) {
                    let sub = items.vlcodes[i].name
                    let ethla = items.vlcodes[i].ethla
                    items.vlcodes.sort((a, b) => Date.parse(b.data.date) - Date.parse(a.data.date));
                    for(let j = 0; j < items.vlcodes[i].data.length; ++j){
                        let date = Date.parse(items.vlcodes[i].data[j].date)-Date.now()+(24*60*60*1000);
                        console.log(date);
                        let tbody = document.querySelector('#dadiv > div > table > tbody');
                        if(date>=0 && date<(7*24*60*60*1000)){
                            console.log("set red")
                            let tr = `<tr class="due item">
                            <td>${sub}</td>
                            <td>${ethla}</td>
                            <td>${items.vlcodes[i].data[j].title}</td>
                            <td>${items.vlcodes[i].data[j].date}</td>
                            </tr>`;
                            tbody.innerHTML += tr;
                        }else{
                            let tr = `<tr class="item">
                            <td>${sub}</td>
                            <td>${ethla}</td>
                            <td>${items.vlcodes[i].data[j].title}</td>
                            <td>${items.vlcodes[i].data[j].date}</td>
                            </tr>`;
                            tbody.innerHTML += tr;
                        }
                    }
                }
            }else{
                tbody.textContent = "Invalid Credentials or Semester!";
            }
        });
    })
    document.querySelector('#update').addEventListener('click',()=>{
        window.open('https://vtop.vit.ac.in', '_blank');
    })
});