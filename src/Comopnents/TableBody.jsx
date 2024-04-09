

const TableBody = ({city}) => {
    return (
        <tr >
         <td className="pl-3 pb-1">{city.name}</td>
         <td>{city.country}</td>
         <td>{city.timezone}</td>
        </tr>
    )
}
export default TableBody;