

const TableBody = ({city}) => {
    return (
        <tr onClick={()=>alert(`City=${city.name} Longitude= ${city.coordinates.lon} Latitude= ${city.coordinates.lat}`)} id="tableRow" className="font-semibold text-yellow-200 cursor-pointer" >
         <td className="p-3">{city.name}</td>
         <td className="p-3"> {city.cou_name_en}</td>
         <td className="p-3">{city.timezone}</td>
        </tr>
    )
}
export default TableBody;