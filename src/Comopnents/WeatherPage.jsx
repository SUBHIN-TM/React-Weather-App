import { useState,useEffect } from "react";
import { useLocation,useParams } from "react-router-dom";

const WeatherPage=()=>{
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

    return(
        <>
        <h1>{city.longitude}</h1>
        <h1>{city.cityName}</h1>
        <h1>{city.latitude}</h1>
        </>    
    )
}

export default WeatherPage;
