import { useNavigate } from "react-router-dom";

const TableBody = ({ city }) => {
    const navigate=useNavigate();
   
const page=()=>{
    navigate("/weather", {
        state:{
            cityName:city.name,
            longitude:city.coordinates.lon,
            latitude:city.coordinates.lat  
        }
    } 
  )
}


    const newTab = (e) => {
        e.preventDefault(); // Prevent the default context menu
        const url = `/weather?rightClick=true&cityName=${city.name}&longitude=${city.coordinates.lon}&latitude=${city.coordinates.lat}`;
        window.open(url, "_blank"); // Open the URL in a new tab
    }
    return (
        <tr onContextMenu={newTab} onClick={page} id="tableRow" className="font-semibold text-yellow-200 cursor-pointer" >
            <td className="p-2">{city.name}</td>
            <td className="p-2"> {city.cou_name_en}</td>
            <td className="p-2">{city.timezone}</td>
        </tr>
    )
}
export default TableBody;