const load = document.getElementById('load')
const results = document.getElementById('results')
const loadLocations = document.getElementById('loadLocations')
const locations = document.getElementById('locations')
const stationsTable = document.getElementById('stationsTable')
const locationsTable = document.getElementById('locationsTable')

load.addEventListener('click', async function () {
    const response = await fetch('/noaa/stations?limit=25');
    const data = await response.json();

    results.innerHTML = '';
    locationsTable.classList.add('hidden');
    stationsTable.classList.remove('hidden');

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

loadLocations.addEventListener('click', async function () {
    const response = await fetch('/noaa/locations?limit=25');
    const data = await response.json();

    locations.innerHTML = '';
    stationsTable.classList.add('hidden');
    locationsTable.classList.remove('hidden');

    data.results.forEach(location => {
        locations.innerHTML += `
        <tr>
            <td>${location.id}</td>
            <td>${location.name}</td>
            <td>${location.mindate ?? '-'}</td>
            <td>${location.maxdate ?? '-'}</td>
            <td>${location.datacoverage ?? '-'}</td>
        </tr>
        `;
    });
})
