import React, { useState, useEffect } from 'react';
import './Stranka.css';

const App = () => {
    const apiKey = "ab7c558f913a97c6589f1802121caf5b";
    const cities = [
        { name: "Blšany", lat: 50.3031, lon: 13.3366 },
        { name: "Louny", lat: 50.3553, lon: 13.7966 },
        { name: "Pičín", lat: 49.5347, lon: 13.9786 },
        { name: "Žatec", lat: 50.3266, lon: 13.5498 },
        { name: "Praha", lat: 50.0755, lon: 14.4378 }
    ];
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const dataPromises = cities.map(city =>
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
            );

            const fetchedData = await Promise.all(dataPromises);
            setWeatherData(fetchedData);
        };

        fetchWeatherData();
    }, []);

    const translateWeatherDescription = (description) => {
        switch (description) {
            case 'Thunderstorm':
                return 'Bouřka';
            case 'Drizzle':
                return 'Mrholení';
            case 'Rain':
                return 'Déšť';
            case 'Snow':
                return 'Sněžení';
            case 'Mist':
                return 'Mlha';
            case 'Smoke':
                return 'Kouř';
            case 'Haze':
                return 'Opar';
            case 'Dust':
                return 'Prach';
            case 'Fog':
                return 'Mlha';
            case 'Sand':
                return 'Písek';
            case 'Ash':
                return 'Popel';
            case 'Squall':
                return 'Squall';
            case 'Tornado':
                return 'Tornádo';
            case 'Clear':
                return 'Jasno';
            case 'Clouds':
                return 'Oblačno';
            default:
                return description;
        }
    };

    return (
        <div className="app-container">
            <h1>Počasí</h1>
            <div className="weather-container">
                {weatherData.map((data, index) => (
                    <div key={index} className="city-weather">
                        <h2 className="city-name">{cities[index].name}</h2>
                        <div className="weather-details">
                            <div className="forecast">
                                <p><strong>{new Date(data.list[0].dt * 1000).toLocaleDateString()}</strong></p>
                                <p>Teplota: {Math.round(data.list[0].main.temp)} °C</p>
                                <p>Popis počasí: {translateWeatherDescription(data.list[0].weather[0].main)}</p>
                                <p>Vlhkost: {data.list[0].main.humidity}%</p>
                                <p>Rychlost větru: {data.list[0].wind.speed} m/s</p>
                                <img
                                    src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`}
                                    alt={data.list[0].weather[0].description}
                                    className="weather-icon"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;