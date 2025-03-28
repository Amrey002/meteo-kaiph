import { getWeather } from './1.js';

// Sélection des éléments du DOM
const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('cityInput');
const weatherContainer = document.getElementById('weatherResults');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const weatherIcon = document.getElementById('weatherIcon');
const forecastContainer = document.getElementById('forecast');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const modeToggle = document.getElementById('darkModeToggle'); 

// Fonction pour afficher les données météo
function displayWeather(data) {
    cityName.textContent = data.name;

    // Température en Celsius
    const tempCelsius = data.main.temp;

    // Conversion en Fahrenheit
    const tempFahrenheit = (tempCelsius * 9/5) + 32;

    // Affichage de la température en Celsius et Fahrenheit
    temperature.textContent = 'Température : ' + tempCelsius.toFixed(1) + '°C (' + tempFahrenheit.toFixed(1) + '°F)';

    description.textContent = 'Conditions : ' + data.weather[0].description;
    humidity.textContent = 'Humidité : ' + data.main.humidity + '%';
    windSpeed.textContent = 'Vent : ' + data.wind.speed + ' km/h';

    // Mise à jour de l'icône météo
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;

    // Affichage des prévisions pour 5 jours
    forecastContainer.innerHTML = '';  // Effacer les prévisions précédentes
    if (data.weather) {
        const fiveDayForecast = 'Prévisions à venir sur 5 jours :';
        forecastContainer.innerHTML = '<p>' + fiveDayForecast + '</p>';
    }

    weatherContainer.classList.remove('hidden');  // Afficher les résultats météo
}

// Fonction pour sauvegarder l'historique des recherches
function saveSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Ajouter la nouvelle ville à l'historique (éviter les doublons)
    if (!history.includes(city)) {
        history.push(city);
    }
    
    // Sauvegarder l'historique mis à jour dans le localStorage
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

// Fonction pour charger et afficher l'historique des recherches
function loadSearchHistory() {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const historyList = document.getElementById('historyList');

    // Vider l'affichage actuel
    historyList.innerHTML = '';

    // Ajouter chaque ville à la liste de l'historique
    history.forEach(function(city) {
        const li = document.createElement('li');
        li.textContent = city;
        historyList.appendChild(li);
    });
}

// Fonction pour effacer l'historique des recherches
function clearSearchHistory() {
    localStorage.removeItem('searchHistory');  // Supprimer l'historique du localStorage
    loadSearchHistory();  // Réinitialiser l'affichage de l'historique
}

// Gestion de l'événement pour effacer l'historique
if (clearHistoryBtn) {  // Vérifier que le bouton existe avant d'ajouter l'événement
    clearHistoryBtn.addEventListener('click', function() {
        clearSearchHistory();  // Appeler la fonction pour effacer l'historique
    });
}

// Fonction pour gérer le mode sombre/clair
function toggleDarkMode() {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
    }
}

// Gestion de l'événement pour changer le mode
if (modeToggle) {  // Vérifier que le bouton existe avant d'ajouter l'événement
    modeToggle.addEventListener('click', toggleDarkMode);
}

// Charger l'historique dès le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadSearchHistory();  // Charger et afficher l'historique
});

// Fonction au clic sur le bouton de recherche
searchButton.addEventListener('click', function() {
    const city = searchInput.value.trim();  // Récupérer la ville saisie

    if (!city) {
        alert('Veuillez entrer une ville.');
        return;
    }

    getWeather(city)  // Appel à la fonction getWeather
        .then(function(data) {
            if (data) {
                displayWeather(data);  // Afficher les résultats
                saveSearchHistory(city);  // Sauvegarder l'historique
            }
        })
        .catch(function(error) {
            console.error('Erreur:', error);
            weatherContainer.innerHTML = '<p>Impossible de récupérer les données météo. Essayez à nouveau.</p>';
            weatherContainer.classList.remove('hidden');
        });
});
