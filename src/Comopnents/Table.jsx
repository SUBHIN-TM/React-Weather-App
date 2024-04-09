import { useEffect, useState } from "react"
import axios from 'axios'
import TableBody from "./TableBody"

const Table = () => {
    const [city, setcity] = useState("")
    useEffect(() => {
        allCity()
    }, [])



    const allCity = async () => {
        try {
            const response = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?limit=100')
            setcity(response.data.results)
        } catch (error) {
            console.error(error);
        }
    }

    if (!city) {
        return
    }

    return (
        <>
            <div className="w-full border border-black ">
                <div id="searchDiv" className="p-2 ">Choose Your City
                    <input className="ml-5" type="search" name="city" id="" placeholder="City Name" />
                </div>
                <div>
                    <table className="w-full">
                        <thead>
                            <tr >
                                <th className="w-6/12 p-3">City Name</th>
                                <th className="w-4/12">Country</th>
                                <th className="w-2/12">TimeZone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {city.map((cities)=>{
                               return  <TableBody key={cities.geoname_id} city={cities} />
                            })}
                        </tbody>
                       
                   </table>
                </div>
            </div>
        </>
    )
}

export default Table;