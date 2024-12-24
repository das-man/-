const container = document.querySelector(".container");
const updateTime = document.querySelector(".updateTime");
const main = document.querySelector(".main");



async function getData() {
    let res = await fetch("https://www.ha.org.hk/opendata/aed/aedwtdata-tc.json");
    let data = await res.json();
    
    // 更改update time
    updateTime.innerHTML = data.updateTime;
    
    // 由時間小至大排序
    let sortedArr = data.waitTime.sort((a, b) => a.topWait[3] - b.topWait[3]);

    sortedArr.forEach(hosp => {
        // set醫院名稱和等候時間的span
        const spanName = document.createElement("span");
        const spanWait = document.createElement("span");
        spanName.textContent = hosp.hospName;
        spanWait.textContent = hosp.topWait;

        // 在line加入span
        const line = document.createElement("line");
        line.appendChild(spanName);
        line.appendChild(spanWait);
        container.appendChild(line);
    });
}

getData();
// 15 minutes interval
setInterval(getData, 15 * 60 * 1000);