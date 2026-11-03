const load = document.getElementById('load')
const results = document.getElementById('results')

load.addEventListener('click', async function () {
    const response = await fetch('/noaa/stations?limit=25');
    const data = await response.json();
    console.log(data);

    results.innerHTML = '';

    data.results.forEach(station => {
        results.innerHTML += `
        <tr>
            <td>${station.id}</td>
            <td>${station.name}</td>
            <td>${station.latitude ?? '-'}</td>
            <td>${station.longitude ?? '-'}</td>
        </tr>
        `;
    });
})
