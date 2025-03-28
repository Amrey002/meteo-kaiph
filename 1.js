const API_KEY = '619a5868e395861807178660e11dde1c'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


export function getWeather(city) {
    const url = BASE_URL + '?q=' + encodeURIComponent(city) + '&appid=' + API_KEY + '&units=metric'; 

    return fetch(url)  
        .then(function(response) {
            if (!response.ok) { 
                throw new Error('Erreur de récupération des données météo');
            }
            return response.json();  
        })
        .then(function(data) {
            return data;  
        })
        .catch(function(error) {
            console.error('Erreur lors de la récupération des données météo :', error);  
        });

}
