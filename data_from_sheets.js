const url = 'https://script.google.com/macros/s/AKfycbz9AajmBH3oCcWQlejVl4qM4-JysTD1KgsZSASfTPPBTFcqf8rPyGoRddqHudFFhhTICQ/exec'
const data = fetch(url)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('data-container')
        const ul = document.createElement('ul')

        data.forEach(item => {
            const li = document.createElement('li')
            li.innerHTML = `<strong>${item.Name}</strong>: ${item.Description}`
            ul.appendChild(li)
        })

        container.appendChild(ul)
    })
    .catch(error => console.error('Error fetching data:', error));
console.log(data)