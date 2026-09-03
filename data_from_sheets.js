const MINUTE = 1000 * 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY;

const token = "uzssknJJVfRIbiUE8iaDaiE5auphHvd2"
const tableId = 1173862
const url = `https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true&order_by=Date`
fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const wrapper = document.getElementById("timeline");
        const scrollable = document.createElement("div");
        scrollable.style.overflowX = 'auto';
        scrollable.style.overflowY = 'hidden';
        scrollable.style.gap = '1%';
        scrollable.style.display = "flex";
        scrollable.style.flexDirection = "row";
        const results = data.results;
        const now = new Date();
        results.forEach(result => {
            const result_date = new Date(result["Date"]);
            if ((result_date.getTime() + 8 * HOUR) <= now.getTime())
                return;
            const event_div = document.createElement("div");
            event_div.innerHTML = result['Event Name'];
            const img = document.createElement("img");
            if (result['Image URL'] == null || result['Image URL'].length === 0)
                img.src = "Carousel Image Backup.jpg";
            else
                img.src = result['Image URL'];
            img.style.objectFit = "cover";
            img.style.width = "100%";
            img.style.height = "100%";
            img.loading = "eager";
            event_div.appendChild(img);
            event_div.style.fontSize = "20px";
            event_div.style.flex = "0 0 33%";
            event_div.style.width = "100px";
            scrollable.appendChild(event_div);
        })
        scrollable.style.scrollbarWidth = "none";
        scrollable.style.scrollbehavior = "smooth";
        const leftBtn = document.createElement("button");
        const iconL = document.createElement("i");
        iconL.className = "fa-solid fa-chevron-left";
        leftBtn.appendChild(iconL);
        leftBtn.style.fontSize = "30px";
        leftBtn.style.width = "40px";
        leftBtn.style.height = "40px";
        leftBtn.style.position = "absolute";
        leftBtn.style.left = '25%';
        leftBtn.style.top = '55%';
        leftBtn.style.zIndex = "2";
        leftBtn.style.opacity = "0.45";
        leftBtn.onclick = () => {scrollable.scrollBy({left: -(scrollable.clientWidth * 0.33), behavior:"smooth"})};
        const RightBtn = document.createElement("button");
        const iconR = document.createElement("i");
        iconR.className = "fa-solid fa-chevron-right";
        RightBtn.appendChild(iconR);
        RightBtn.style.padding = "0";
        RightBtn.style.fontSize = "30px";
        RightBtn.style.width = "40px";
        RightBtn.style.height = "40px";
        RightBtn.style.position = "absolute";
        RightBtn.style.left = 'calc(75% - 40px)';
        RightBtn.style.top = '55%';
        RightBtn.style.zIndex = "2";
        RightBtn.style.opacity = "0.45";
        RightBtn.onclick = () => {scrollable.scrollBy({left: (scrollable.clientWidth * 0.33), behavior:"smooth"})};
        wrapper.appendChild(leftBtn);
        wrapper.appendChild(RightBtn);
        wrapper.appendChild(scrollable);
        console.log(results);
    })
    .catch(error => console.error("Error:", error))