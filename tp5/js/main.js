var app;
window.onload = function () {
    app = new Vue({
        el: "#weatherApp",
        data: {
            loaded: false,
            formCityName: "",
            message: "WebApp Chargée.",
            messageForm: "",
            cityList: [
                {
                    name: "Paris",
                },
            ],
            cityWeather: null,
            cityWeatherLoading: false,
        },
        mounted: function () {
            this.loaded = true;
            this.readData();
        },
        methods: {
            readData: function () {
                console.log("Liste des villes:", JSON.stringify(this.cityList));
                console.log("Chargé:", this.loaded);
            },
            addCity: function (event) {
                event.preventDefault(); 

                if (this.isCityExist(this.formCityName)) {
                    this.messageForm = "La ville existe déjà.";
                } else {
                    this.cityList.push({ name: this.formCityName.trim() });
                    this.messageForm = ""; 
                    this.formCityName = ""; 
                }
            },
            isCityExist: function (_cityName) {
                
                return this.cityList.filter(item =>
                    item.name.toUpperCase() === _cityName.toUpperCase()
                ).length > 0;
            },
            remove: function (_city) {
                
                this.cityList = this.cityList.filter(item => item.name !== _city.name);
                
               
                if (this.cityWeather && this.cityWeather.name === _city.name) {
                    this.cityWeather = null;
                }
            },
            meteo: function (_city) {
                const apiKey = '0ada432b59deb9716c357092c5f79be6'; 
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${_city.name}&units=metric&lang=fr&appid=${apiKey}`;

                this.cityWeatherLoading = true;
                fetch(url)
                    .then(response => response.json())
                    .then(json => {
                        this.cityWeatherLoading = false;

                        if (json.cod === 200) {
                            this.cityWeather = json;
                            this.messageForm = "";
                        } else {
                            this.cityWeather = null;
                            this.messageForm = `Météo introuvable pour ${_city.name} (${json.message})`;
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        this.cityWeatherLoading = false;
                        this.messageForm = "Erreur lors de la récupération des données météo.";
                    });
            },
        },
    });
};
