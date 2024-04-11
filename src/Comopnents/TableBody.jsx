

const TableBody = ({city}) => {
    return (
        <tr id="tableRow" className="font-semibold text-yellow-200" >
         <td className="pl-3 pb-1 p-2">{city.name}</td>
         <td>{city.cou_name_en}</td>
         <td>{city.timezone}</td>
        </tr>
    )
}
export default TableBody;