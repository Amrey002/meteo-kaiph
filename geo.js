function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                
                // 👉 Appelle ici une fonction pour récupérer la météo basée sur ces coordonnées
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.error("Erreur de géolocalisation : ", error.message);
            }
        );
    } else {
        console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
}

function getWeatherByCoords(lat, lon) {
    const apiKey = "TA_CLE_API"; // Remplace par ta clé OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // 👉 Ici, tu peux afficher les données météo dans le DOM
            displayWeatherData(data);
        })
        .catch(error => console.error("Erreur lors de la récupération des données météo :", error));
}

function displayWeatherData(data) {
    const weatherContainer = document.getElementById("weather-info");
    if (!weatherContainer) return;

    weatherContainer.innerHTML = `
        <h2>${data.name}</h2>
        <p>Température : ${data.main.temp}°C</p>
        <p>Conditions : ${data.weather[0].description}</p>
    `;
}

// 👉 Appelle la fonction lors du chargement de la page
window.addEventListener("load", getLocation);
