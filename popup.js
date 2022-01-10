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
    document.querySelector('#login').addEventListener('click', () => {
        document.querySelector('#da').classList.add('tab-inact');
        document.querySelector('#login').classList.remove('tab-inact');
        changeDisplay()
    })
    document.querySelector('#da').addEventListener('click', () => {
        document.querySelector('#da').classList.remove('tab-inact');
        document.querySelector('#login').classList.add('tab-inact');
        changeDisplay()
    })
    function changeDisplay() {
        let ul = document.querySelector('.tabs-container');
        if (ul.querySelector('#da').getAttribute('class').includes('tab-inact')) {
            console.log(1)
            document.querySelector('#logindiv').style.display = 'block';
            document.querySelector('#dadiv').style.display = 'none';
        }
        else {
            console.log(2)
            document.querySelector('#logindiv').style.display = 'none';
            document.querySelector('#dadiv').style.display = 'block';
        }
    }

    chrome.storage.sync.get(['semlist'], function (data) {
        let obj = data.semlist;
        console.log(obj)
        document.querySelector(".classic").innerHTML += obj
        console.log("Success :)))")
    })

    document.querySelector('#da').addEventListener('click', () => {
        let temptrash = document.querySelector('#dadiv > div > table > tbody').innerHTML.trim()
        console.log(temptrash)
        if (temptrash != '') {
            return;
        }
        chrome.storage.sync.get(['vlcodes'], function (items) {
            let obj = items.vlcodes;
            let flat = [];
            console.log(obj);
            for (let i = 0; i < obj.length; i++) {
                for (let j = 0; j < obj[i].data.length; j++) {
                    let temp = {};
                    temp.code = obj[i].code;
                    temp.name = obj[i].name;
                    temp.ethla = obj[i].ethla;
                    temp.title = obj[i].data[j].title;
                    temp.date = obj[i].data[j].date;
                    flat[flat.length] = temp;
                }
            }
            flat.sort((b, a) => Date.parse(b.date) - Date.parse(a.date));
            console.log(flat);
            if (flat.length !== 0) {
                for (let i = 0; i < flat.length; ++i) {
                    let sub = flat[i].name
                    let ethla = flat[i].ethla
                    let date = Date.parse(flat[i].date) - Date.now() + (24 * 60 * 60 * 1000);
                    console.log(date);
                    let tbody = document.querySelector('#dadiv > div > table > tbody');
                    if (date < 0) {
                        continue;
                    }
                    else if (date >= 0 && date < (1 * 24 * 60 * 60 * 1000)) {
                        let tr = `<tr class="due-1 item cname-${i}"></tr>`;
                        tbody.innerHTML += tr;
                    }
                    else if (date >= 0 && date < (7 * 24 * 60 * 60 * 1000)) {
                        let tr = `<tr class="due-7 item cname-${i}"></tr>`;
                        tbody.innerHTML += tr;
                    } else {
                        let tr = `<tr class="item cname-${i}"></tr>`;
                        tbody.innerHTML += tr;
                    }
                    document.querySelector(`.cname-${i}`).innerHTML += `
                    <td>${sub}</td>
                    <td>${ethla}</td>
                    <td>${flat[i].title}</td>
                    <td>${flat[i].date}</td>
                    `;
                }
            } else {
                tbody.textContent = "Invalid Credentials or Semester!";
            }
        });
    })
    document.querySelector('#update').addEventListener('click', () => {
        window.open('https://vtop.vit.ac.in', '_blank');
    })
});