// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

for (const line of fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split('\n')) {
  const i = line.indexOf('=');
  if (i > 0) process.env[line.slice(0, i).trim()] = line.slice(i + 1).trim();
}

const app = express();

app.use(express.static('.'));

app.get('/noaa/*spath', async (req, res) => {
  const spath = req.params.spath;
  const qs = new URLSearchParams(req.query).toString();
  const url = `https://www.ncei.noaa.gov/cdo-web/api/v2/${spath}${qs ? `?${qs}` : ''}`;
  const r = await fetch(url, {
    headers: { token: process.env.NOAA_TOKEN }
  });
  res.status(r.status).type('json').send(await r.text());
});

app.listen(3000, () => console.log('http://localhost:3000'));
