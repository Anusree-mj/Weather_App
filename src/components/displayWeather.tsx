import React, { useEffect, useState } from 'react'
import { MainWrapper } from './style.module'
import { AiOutlineSearch } from "react-icons/ai"
import { WiHumidity } from "react-icons/wi"
import { SiWindicss } from "react-icons/si"
import { BsFillSunFill, BsCloudyFill, BsFillCloudRainFill, BsCloudFog2Fill } from "react-icons/bs"
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from 'axios'
import { weatherDataProps } from './type'


const DisplayWeather = () => {
    const api_key = process.env.REACT_APP_API_KEY;
    const api_Endpoint = process.env.REACT_APP_API_ENDPOINT;

    const [weatherData, setWeatherData] = useState<weatherDataProps | null>(null)

    const fetchCurrentWeather = async (lat: number, lon: number) => {
        const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    };


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
                ([currentWeather]) => {
                    setWeatherData(currentWeather);
                }
            );
        });
    }, [fetchCurrentWeather]);

    return (
        <MainWrapper>
            <div className="container">

                <div className="searchArea">
                    <input type="text" placeholder='Enter a city' />
                    <div className="searchCircle">
                        <AiOutlineSearch className='searchIcon' />
                    </div>
                </div>
                {weatherData && (
                    <>
                        <div className="weatherArea">
                            <h1>{weatherData.name}</h1>
                            <span>{weatherData.sys.country}</span>
                            <div className="icon">
                                icon
                            </div>
                            <h1>{weatherData.main.temp}c</h1>
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
                )}


            </div>
        </MainWrapper>
    )
}

export default DisplayWeather