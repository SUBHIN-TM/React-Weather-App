import { useEffect, useState } from "react"
import axios from 'axios'
import TableBody from "./TableBody"
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaSort } from "react-icons/fa6";

const Table = () => {
    const [city, setcity] = useState([])
    const [sort, setsort] = useState("")
    const [offset,setoffset]=useState(0)
    console.log(offset);
    useEffect(() => {
        allCity()    
    },[sort])

    let sortFuction = (parameter) => {
        console.log("called");
        if (parameter === 'name') {
            setsort((previous) => {
                if (previous === 'name') {
                    return '-name'
                } else {
                    return 'name'
                }
            })
        } else if (parameter === 'cou_name_en') {
            setsort((previous) => {
                if (previous === 'cou_name_en') {
                    return '-cou_name_en'
                } else {
                    return 'cou_name_en'
                }
            })
        } else if (parameter === 'timezone') {
            setsort((previous) => {
                if (previous === 'timezone') {
                    return '-timezone'
                } else {
                    return 'timezone'
                }
            })
        }
       
        setoffset(0)
        setcity([])
    }



    const allCity = async () => {

        try {
            console.log("sort value",sort);
            let response
            if (sort) {
                response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=${sort}&limit=100&offset=${offset}`)
            console.log('sort called');
            } else {
                response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&offset=${offset}`)
            }
            setTimeout(() => {
                setcity((previous)=>[...previous,...response.data.results])
                setoffset((pvs)=>pvs+100)
            }, 2000);
            
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
                    
                        <InfiniteScroll
                        dataLength={city.length} //This is important field to render the next data
                        next={allCity}
                        hasMore={true}
                        loader={<h4 className="text-white">Loading...</h4>}
                        >
                    <table className="  max-h-[650px]">
                        <thead className="sticky top-0 bg-black text-white">
                            <tr className="">
                                <th className="w-6/12 text-start p-3"><span>City Name</span><span onClick={() => sortFuction('name')} className="inline-block text-lg pl-3"><FaSort /></span></th>
                                <th className="w-4/12 text-start"><span>Country</span><span onClick={() => sortFuction('cou_name_en')} className="inline-block  pl-3"><FaSort /></span></th>
                                <th className="w-2/12 text-start"><span>TimeZone</span><span onClick={() => sortFuction('timezone')} className="inline-block  pl-3"><FaSort /></span></th>
                            </tr>
                        </thead>

                        <tbody>
                            {city.map((cities,index) => {
                                return <TableBody key={cities.coordinates.lon} city={cities} />
                            })}

                        </tbody>
                        
                    </table>
                    </InfiniteScroll>
            </div>


        </div >
        </>
    )
}

export default Table;