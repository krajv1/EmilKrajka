document.addEventListener('DOMContentLoaded', () => {
    const getLocationBtn = document.getElementById('getLocation');
    const weatherInfo = document.getElementById('weatherInfo');
    
    // Obsługa przycisku lokalizacji
    getLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const location = `${position.coords.latitude},${position.coords.longitude}`;
                    getWeather(location);
                },
                error => {
                    alert('Błąd pobierania lokalizacji: ' + error.message);
                }
            );
        } else {
            alert('Twoja przeglądarka nie obsługuje geolokalizacji');
        }
    });
    
    // Obsługa linków z ustalonymi lokalizacjami
    document.querySelectorAll('a[data-location]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            getWeather(link.dataset.location);
        });
    });
    
    // Pobierz dane pogodowe
    async function getWeather(location) {
        try {
            const response = await fetch(`/weather/${location}`);
            const data = await response.json();
            
            // Aktualizuj UI
            document.getElementById('locationName').textContent = 'Twoja lokalizacja';
            document.getElementById('temperature').textContent = data.current.temperature;
            document.getElementById('windspeed').textContent = data.current.windspeed;
            
            // Komunikat o temperaturze
            const tempMessage = document.getElementById('tempMessage');
            tempMessage.className = 'message ';
            
            if (data.current.temperature < 10) {
                tempMessage.textContent = 'Zimno! Zostań w domu.';
                tempMessage.classList.add('cold');
            } else if (data.current.temperature > 25) {
                tempMessage.textContent = 'Upał! Pamiętaj o wodzie.';
                tempMessage.classList.add('hot');
            } else {
                tempMessage.textContent = 'Przyjemnie! Idealna pogoda.';
                tempMessage.classList.add('nice');
            }
            
            // Prognoza na jutro
            const tomorrowMessage = document.getElementById('tomorrowMessage');
            tomorrowMessage.className = 'message ';
            
            if (data.tomorrow.precipitation > 0) {
                tomorrowMessage.textContent = 'Będzie padać! Weź parasol.';
                tomorrowMessage.classList.add('umbrella');
            } else {
                tomorrowMessage.textContent = 'Brak opadów! Idź na spacer.';
                tomorrowMessage.classList.add('walk');
            }
            
            weatherInfo.style.display = 'block';
        } catch (error) {
            console.error('Błąd:', error);
            alert('Nie udało się pobrać danych pogodowych');
        }
    }
});