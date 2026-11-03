const load = document.getElementById('load')
const results = document.getElementById('results')
const loadLocations = document.getElementById('loadLocations')
const locations = document.getElementById('locations')
const loadData = document.getElementById('loadData')
const dataResults = document.getElementById('dataResults')
const stationsTable = document.getElementById('stationsTable')
const locationsTable = document.getElementById('locationsTable')
const dataTable = document.getElementById('dataTable')
const error = document.getElementById('error')

function showOnly(table) {
    stationsTable.classList.add('hidden')
    locationsTable.classList.add('hidden')
    dataTable.classList.add('hidden')
    table.classList.remove('hidden')
}

load.addEventListener('click', async function () {
    const response = await fetch('/noaa/stations?limit=25');
    const data = await response.json();

    results.innerHTML = '';
    showOnly(stationsTable);

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
    showOnly(locationsTable);

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

loadData.addEventListener('click', async function () {
    try {
        error.classList.add('hidden')
        const params = new URLSearchParams({
            datasetid: document.getElementById('datasetid').value,
            locationid: document.getElementById('locationid').value,
            startdate: document.getElementById('startdate').value,
            enddate: document.getElementById('enddate').value,
            limit: 25,
        });

        const response = await fetch(`/noaa/data?${params}`);
        if (!response.ok) throw new Error(`Błąd HTTP ${response.status}`);
        const data = await response.json();

        dataResults.innerHTML = '';
        showOnly(dataTable);

        (data.results ?? []).forEach(row => {
            dataResults.innerHTML += `
            <tr>
                <td>${row.date ?? '-'}</td>
                <td>${row.datatype ?? '-'}</td>
                <td>${row.station ?? '-'}</td>
                <td>${row.value ?? '-'}</td>
                <td>${row.attributes ?? '-'}</td>
            </tr>
            `;
        });
    } catch (e) {
        error.textContent = `Nie udało się pobrać danych: ${e.message}`;
        error.classList.remove('hidden');
    }
})
