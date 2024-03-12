import React, { useCallback, useEffect, useState } from 'react'
import { MainWrapper } from './style.module'
import { AiOutlineSearch } from "react-icons/ai"
import { WiHumidity } from "react-icons/wi"
import { SiWindicss } from "react-icons/si"
import { RiLoaderFill } from "react-icons/ri";
import { weatherDataProps } from './type'
import { fetchWeatherData, fetchCurrentWeather } from '../helpers/fetchCurrentWeather'
import iconChanger from './iconChanger'

const DisplayWeather = () => {  

    const [weatherData, setWeatherData] = useState<weatherDataProps | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [searchCity, setSearchCity] = useState('');
   
    const handleSearch = async () => {
        if (searchCity.trim() === "") {
            return;
        }
        try {
            const { currentWeatherData } = await fetchWeatherData(searchCity);
            setWeatherData(currentWeatherData);
        } catch (error) {
        }
    };
   
    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const [currentWeather] = await Promise.all([fetchCurrentWeather(latitude, longitude)]);
                setWeatherData(currentWeather);
                setIsLoading(true);
            });
        };
        fetchData();
    }, [fetchCurrentWeather]);

    return (
        <MainWrapper>
            <div className="container">

                <div className="searchArea">
                    <input type="text" placeholder='Enter a city'
                        onChange={(e) => setSearchCity(e.target.value)}
                        value={searchCity} />
                    <div className="searchCircle">
                        <AiOutlineSearch className='searchIcon' onClick={handleSearch} />
                    </div>
                </div>
                {weatherData && isLoading ? (
                    <>
                        <div className="weatherArea">
                            <h1>{weatherData.name}</h1>
                            <span>{weatherData.sys.country}</span>
                            <div className="icon">
                                {iconChanger(weatherData.weather[0].main)}
                            </div>
                            <h1>{weatherData.main.temp}&deg;C</h1>
                            <h2>{weatherData.weather[0].main}</h2>
                        </div>

                        <div className="bottomInfoArea">
                            <div className="humidityLevel">
                                <WiHumidity className='windIcon' />
                                <div className="humidInfo">
                                    <h1>{weatherData.main.humidity}%</h1>
                                    <p>Humidity</p>
                                </div>
                            </div>

                            <div className="wind">
                                <SiWindicss className='windIcon' />
                                <div className="humidInfo">
                                    <h1>{weatherData.wind.speed}km/h</h1>
                                    <p>Wind speed</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="loading">
                        <RiLoaderFill className='loadingIcon' />
                        <p>Loading</p>
                    </div>

                )
                }
            </div>
        </MainWrapper>
    )
}

export default DisplayWeather