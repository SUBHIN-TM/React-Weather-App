import axios from "axios";
import { useState,useEffect } from "react";
import { useLocation,useParams } from "react-router-dom";

const WeatherPage=()=>{
    const apiKey='45b34f6f93ff403350ec501179866313'
    const wetherURL=`https://api.openweathermap.org/data/2.5/weather?lat=33.79712&lon=68.93749&appid=${apiKey}`
    const [city,setCity]=useState({
        cityName:null,
        longitude:null,
        latitude:null
    })
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const rightClick =searchParams.get("rightClick");
    
   useEffect(()=>{
    if(rightClick){
        const cityName = searchParams.get("cityName");
        const longitude = searchParams.get("longitude");
        const latitude = searchParams.get("latitude");
        setCity({cityName,longitude,latitude})
    }else if(location.state){
       const {cityName,longitude,latitude} = location.state
       setCity({cityName,longitude,latitude})
    }
   },[rightClick,location.state])

   useEffect(() => {
    if (city.latitude && city.longitude) {
        fetch();
    }
}, [city]);

   const fetch=async()=>{
    const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${apiKey}`)
    console.log(response.data);

   }
 
    return(
        <>
        <h1>{city.longitude}</h1>
        <h1>{city.cityName}</h1>
        <h1>{city.latitude}</h1>
        </>    
    )
}

export default WeatherPage;
