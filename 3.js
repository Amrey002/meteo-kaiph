// Sélecteurs pour l'historique des recherches
const historyList = document.getElementById('historyList');

// Fonction pour sauvegarder l'historique des recherches
function saveSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Vérifier si la ville est déjà dans l'historique
    if (!history.includes(city)) {
        history.push(city);
    }

    // Sauvegarder l'historique dans localStorage
    localStorage.setItem('searchHistory', JSON.stringify(history));

    displaySearchHistory();  // Mettre à jour l'affichage de l'historique
}

// Fonction pour afficher l'historique des recherches
function displaySearchHistory() {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    historyList.innerHTML = '';  // Vider la liste précédente

    history.forEach(function(city) {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        historyList.appendChild(listItem);

        // Ajouter un événement pour rechercher la ville quand on clique sur un élément de l'historique
        listItem.addEventListener('click', function() {
            searchInput.value = city;
            searchButton.click();  // Déclencher la recherche
        });
    });
}

// Afficher l'historique des recherches au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    displaySearchHistory();
});