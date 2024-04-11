import { useEffect, useState,useRef  } from "react"
import axios from 'axios'
import TableBody from "./TableBody"
import { FaSort } from "react-icons/fa6";

const Table = () => {
    const [city, setcity] = useState([])
    const [sort, setsort] = useState("")
    const [offset, setoffset] = useState(0)
    const tableRef=useRef(null)
    console.log(offset);
    useEffect(() => {
        allCity()
    }, [sort])

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
            console.log("sort value", sort);
            let response
            if (sort) {
                response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=${sort}&limit=20&offset=${offset}`)
                console.log('sort called');
            } else {
                response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}`)
            }
            setTimeout(() => {
                setcity((previous) => [...previous, ...response.data.results])
                setoffset((pvs) => pvs + 20)
            }, 2000);

        } catch (error) {
            console.error(error);
        }
    }

    const handleScroll =()=>{
        const {scrollTop,offsetHeight,scrollHeight} =tableRef.current;
        if(scrollTop +offsetHeight >= scrollHeight){
            allCity()
        }
    }

    if (!city) {
        return
    }

    return (
        <>
            <div className="flex flex-col gap-5   px-24">
                <div id="searchDiv" >
                    <label className=" font-semibold " htmlFor="">Choose Your City</label>
                    <input className="px-3 py-1 ml-6 rounded-lg" type="search" name="city" id="" placeholder="City Name" />
                </div>
                <div>
                   <label className="font-semibold pr-9" htmlFor="">Filter Timezone</label>
                   <select className="px-3 py-1 rounded-lg" name="d" id="">
                    <option value="">Africa</option>
                    <option value="">Asia</option>
                    <option value="">Africa</option>
                    
                   </select>
                </div>
                <div className="tableContainer  overflow-y-auto  lg:w-7/12" style={{maxHeight:600}} ref={tableRef} onScroll={handleScroll}>
                        <table className=" w-full">
                            <thead className=" bg-black text-white text-left sticky top-0">
                                <tr className="">
                                    <th className="p-3 w-6/12"><span>City Name</span><span onClick={() => sortFuction('name')} className="inline-block text-lg pl-3"><FaSort /></span></th>
                                    <th className="p-3 w-3/12"><span>Country</span><span onClick={() => sortFuction('cou_name_en')} className="inline-block  pl-3"><FaSort /></span></th>
                                    <th  className="p-3 w-3/12"><span>TimeZone</span><span onClick={() => sortFuction('timezone')} className="inline-block  pl-3"><FaSort /></span></th>
                                </tr>
                            </thead>

                            <tbody >
                                {city.map((cities) => {
                                    return <TableBody key={cities.coordinates.lon} city={cities} />
                                })}

                            </tbody>
                         
                        </table>
                        <h1 id="loading" className="text-white font-semibold p-3" >Loading...</h1>
                </div>
            </div >
        </>
    )
}

export default Table;