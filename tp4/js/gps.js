// gps.js

// Запрос геолокации у пользователя
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.querySelector("#map").innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Если пользователь разрешает, получаем координаты
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const latlon = `${latitude},${longitude}`;
    
    // Обновляем поле 'adresse' с координатами
    const adresseField = document.getElementById("adresse");
    if (adresseField) {
        adresseField.value = latlon;
        // Обновляем счётчик символов для 'adresse'
        updateCharCount('adresse');
    }

    // Строим URL для статической карты Google Maps
    const img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(latlon)}&zoom=14&size=400x300&markers=${encodeURIComponent(latlon)}&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

    // Отображаем карту
    const mapElement = document.querySelector("#map");
    if (mapElement) {
        mapElement.innerHTML = `<img src='${img_url}' alt="Map of your location">`;
    }
}

// Обработка ошибок при получении геолокации
function showError(error) {
    const mapElement = document.querySelector("#map");
    if (!mapElement) return;

    switch (error.code) {
        case error.PERMISSION_DENIED:
            mapElement.innerHTML = "L'utilisateur a refusé la demande de géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            mapElement.innerHTML = "Les informations de localisation ne sont pas disponibles.";
            break;
        case error.TIMEOUT:
            mapElement.innerHTML = "La demande de géolocalisation a expiré.";
            break;
        case error.UNKNOWN_ERROR:
            mapElement.innerHTML = "Une erreur inconnue est survenue.";
            break;
    }
}
