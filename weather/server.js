const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 5000; // Bezpieczny port

// Middleware do obsługi CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('public'));

// Endpoint pogodowy
app.get('/weather/:location', async (req, res) => {
    try {
        const location = req.params.location;
        const [latitude, longitude] = location.split(',');

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m,precipitation&daily=precipitation_sum&timezone=auto`;

        const response = await fetch(url);
        const data = await response.json();

        res.json({
            current: {
                temperature: data.current.temperature_2m,
                windspeed: data.current.windspeed_10m,
                precipitation: data.current.precipitation
            },
            tomorrow: {
                precipitation: data.daily.precipitation_sum[1] || 0
            }
        });
    } catch (error) {
        console.error('Błąd API:', error);
        res.status(500).json({
            error: 'Błąd serwera pogodowego',
            details: error.message
        });
    }
});

// Strona główna
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`---------------------------------------------------`);
    console.log(` Serwer działa na http://localhost:${PORT}`);
    console.log(`---------------------------------------------------`);
    console.log(` Jeśli masz problemy z połączeniem:`);
    console.log(` 1. Upewnij się, że firewall nie blokuje portu ${PORT}`);
    console.log(` 2. Spróbuj wyłączyć VPN/proxy`);
    console.log(` 3. Użyj przeglądarki Chrome lub Firefox`);
    console.log(`---------------------------------------------------`);
});