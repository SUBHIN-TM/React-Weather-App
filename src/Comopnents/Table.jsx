import { useEffect, useState } from "react"
import axios from 'axios'
import TableBody from "./TableBody"
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaSort } from "react-icons/fa6";

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
            <div className="">
                <div id="searchDiv" className="pl-3 ">Choose Your City
                    <input className="ml-5" type="search" name="city" id="" placeholder="City Name" />
                </div>
                <div className="tableContainer p-3">
                    <table className="overflow-y-scroll inline-block  w-12/12 max-h-[650px]">
                        <thead className="sticky top-0 bg-black text-white">
                            <tr className="">
                                <th  className="w-6/12 text-start p-3"><span>City Name</span><span className="inline-block text-lg pl-3"><FaSort /></span></th>
                                <th className="w-4/12 text-start"><span>Country</span><span className="inline-block  pl-3"><FaSort /></span></th>
                                <th className="w-2/12 text-start"><span>TimeZone</span><span className="inline-block  pl-3"><FaSort /></span></th>
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