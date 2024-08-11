import React, { useState } from 'react';
import './Weather.css';

const api = {
    key: "6cbabbae6237ce651fec1e04f1b50acc",
    base: "https://api.openweathermap.org/data/2.5/"
};
const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState(null);
    const search = () => {
        if (query) {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(response => response.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                })
                .catch(error => console.log(error));
        }
    };
    const dateBuilder = (d) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const days = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${month} ${date}, ${year}`;
    };
    return (
        <div className="weather-app" >
            <main>
                <div className='search-box'>
                    <input
                        type="text"
                        className='search-bar'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search city..."/>
                    <button onClick={search}>Search</button>
                </div>
                {weather && (
                    <div className='weather-info'>
                        <div className='location'>
                            {weather.name}, {weather.sys.country}
                        </div>
                        <div className='date'>
                            {dateBuilder(new Date())}
                        </div>
                        <div className='current-weather'>
                            <div className='temperature'>
                                {Math.round(weather.main.temp)} °C
                            </div>
                            <div className='description'>
                                {weather.weather[0].description}
                            </div>
                        </div>
                        <div className='details'>
                            <div className='feels-like'>
                                Feels Like: {Math.round(weather.main.feels_like)} °C
                            </div>
                            <div className='wind'>
                                Wind Speed: {weather.wind.speed} m/s
                            </div>
                            <div className='visibility'>
                                Visibility: {weather.visibility / 1000} km
                            </div>
                            <div className='pressure'>
                                Pressure: {weather.main.pressure} hPa
                            </div>
                            <div className='humidity'>
                                Humidity: {weather.main.humidity}%
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
export default Weather;