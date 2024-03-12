import axios from 'axios';
import { weatherDataProps } from '../components/type';

const api_key = process.env.REACT_APP_API_KEY;
const api_Endpoint = process.env.REACT_APP_API_ENDPOINT;

const fetchCurrentWeather = async (lat: number, lon: number) => {
    const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
};

const fetchWeatherData = async (city: string): Promise<{ currentWeatherData: weatherDataProps }> => {
    try {
        const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`;
        const searchResponse = await axios.get(url);

        const currentWeatherData: weatherDataProps = searchResponse.data;
        return { currentWeatherData };
    } catch (error) {
        throw error;
    }
};

export  {fetchCurrentWeather,fetchWeatherData};
