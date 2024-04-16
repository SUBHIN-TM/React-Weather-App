import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cloud from '../assets/cloud.png'
import Image from "./Image";
import ForeCast from "./ForeCast";


const WeatherPage = () => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [weather, setWeather] = useState({
        temp: null,
        windSpeed: null,
        humidity: null,
        weatherDescription: null,
        pressure: null

    })
    const [forecastDatas,setforecastDatas] =useState(null)
    const [foreCastMultipledata,setforeCastMultipledata] =useState({
        time:null,
        temp:null,
        humidity:null
    })
    const [isLoading, setIsloading] = useState(false)
    const apiKey = '45b34f6f93ff403350ec501179866313'
    const [city, setCity] = useState({
        cityName: null,
        longitude: null,
        latitude: null
    })
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const rightClick = searchParams.get("rightClick");

    useEffect(() => {
        if (rightClick) {
            const cityName = searchParams.get("cityName");
            const longitude = searchParams.get("longitude");
            const latitude = searchParams.get("latitude");
            setCity({ cityName, longitude, latitude })
        } else if (location.state) {
            const { cityName, longitude, latitude } = location.state
            setCity({ cityName, longitude, latitude })
        }
    }, [rightClick, location.state])

    useEffect(() => {
        if (city.latitude && city.longitude) {
            fetch();
        }
    }, [city]);

    function convertKelvinToCelsius(kelvin) {
        return Math.floor(kelvin - 273.15)
    }
    function convertMetersPerSecondToKilometersPerHour(metersPerSecond) {
        return Math.floor(metersPerSecond * 3.6);
    }




    const fetch = async () => {
        try {
            setIsloading(true)
            const [weatherResponse, forecastResponse] = await Promise.all([
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${apiKey}`),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.latitude}&lon=${city.longitude}&appid=${apiKey}`)
   
            ])
            setIsloading(false)
            console.log("weather deatails", weatherResponse.data);
            // console.log("forecastr", forecastResponse.data);

            const timestamp = weatherResponse.data.dt * 1000;
            const timezoneOffset = weatherResponse.data.timezone * 1000;
            const utcDate = new Date(timestamp);
            const localDate = new Date(utcDate.getTime() + timezoneOffset);
            const localDateString = localDate.toUTCString();

            const parts = localDateString.split(' ');
            const date = parts.slice(0, 4).join(' ');
            let time = parts[4];

            // Convert the time to 12-hour format with AM/PM indicator
            let [hours, minutes, seconds] = time.split(':');
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert hours to 12-hour format
            time = `${hours}:${minutes}:${seconds} ${ampm}`;


            console.log("Current date of weather data: " + date);
            console.log("Current time of weather data: " + time);

            const description = weatherResponse.data.weather[0].description;
            const capitalizedDescription = description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            setDate(date);
            setTime(time);
            setWeather({
                temp: convertKelvinToCelsius(weatherResponse.data.main.temp),
                windSpeed: convertMetersPerSecondToKilometersPerHour(weatherResponse.data.wind.speed),
                humidity: weatherResponse.data.main.humidity,
                weatherDescription: capitalizedDescription,
                pressure: weatherResponse.data.main.pressure
            })
            setforecastDatas(forecastResponse.data.list)

        } catch (error) {
            console.error(error);
        }

    }

    console.log(forecastDatas);

    if (isLoading) {
        return
    }

    return (
        <>
            <div className="sm:p-10 p-1 py-5 ">
                <div className="weather rounded-xl p-5 sm:p-7 sm:pb-11 text-white">
                    <h1 className="font-bold text-xl">{city.cityName}</h1>
                    <h1><span>{date}</span> <br /><span>{time}</span></h1>
                    <div className="flex pt-7">
                        <Image style={"h-4"} path={Cloud} />
                        <div className="grid  sm:p-3 lg:pl-7 pl-2">
                            <span className="text-3xl">{weather.temp}&nbsp;&deg;C</span>
                            <span className="text-lg italic">{weather.weatherDescription}</span>
                            <span>Wind Speed : {weather.windSpeed} Km/Hr</span>
                            <span>Humidity : {weather.humidity}%</span>
                            <span>Pressure : {weather.pressure} MB</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-around mt-10 flex-wrap">
                    {forecastDatas?.slice(0,7).map((data)=> {
                      return( < ForeCast key={data.dt_txt} time={data.dt_txt}  temp={convertKelvinToCelsius(data.main.temp)} humidity={data.main.humidity}  />)           
                    })}         
                </div>
            </div>
        </>
    )
}

export default WeatherPage;
