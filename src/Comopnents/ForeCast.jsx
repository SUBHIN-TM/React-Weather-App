import Image from "./Image";
import foreCast from '../assets/weather.png'


const ForeCast = ({ time, temp }) => {
    const dateTimeString = time //TIME DATE FORMAT IN STRING
    const dateTime = new Date(dateTimeString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[dateTime.getDay()];
    const date=dateTimeString.split(" ")[0].split("-")[2]
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;


    return (
        <div className="forecast grid border  w-40 sm:w-48  justify-center text-center rounded-xl p-3  text-white">
            <span >{dayName} {date} </span>
            <span>{timeString} </span>
            <div className="m-auto"><Image path={foreCast}  /></div>      
            <span className="sm:text-lg p-3 font-semibold">Weather : {temp}&nbsp;&deg;C</span>
        </div>
    )
}

export default ForeCast;