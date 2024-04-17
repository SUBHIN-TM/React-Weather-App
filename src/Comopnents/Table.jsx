import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import TableBody from "./TableBody"
import { FaSort } from "react-icons/fa6";
import Filter from "./Filter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASEURL } from "../Constants/Links";

const Table = () => {
    const [city, setcity] = useState([])
    const [sort, setsort] = useState("")
    const [offset, setoffset] = useState(0)
    const [selectedcountries, setselectedcountries] = useState([])
    const [selectedtimezone, setselectedtimezone] = useState([])
    const [search, setsearch] = useState("")
    const [isLoading, setIsloading] = useState(false)
    const [noData,setNoData]=useState(false)
    const [error, setError] = useState(null)
    const tableRef = useRef(null) //REFFERENCE FOR SCROLLABLE CONTROLLER
    let baseURL = `${BASEURL}&offset=${offset}`

    useEffect(() => {
        allCity()
    }, [sort, selectedcountries, selectedtimezone, search])


    const selectedCountryLiftUp = (selectedCountries) => {
        setselectedcountries(selectedCountries)
        setoffset(0)
        setcity([])
    }

    const selectedTimeLiftUp = (selectedTime) => {
        setselectedtimezone(selectedTime)
        setoffset(0)
        setcity([])
    }

    let sortFuction = (parameter) => {
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
            let finalURL = baseURL
            if (sort) { //IF SORT SELECTED THE SELECTED CREITERIA WILL ADDED TO THE SENDING URL
                finalURL += `&order_by=${sort}`
            }
            if (selectedcountries.length > 0) {
                const filterCountryArrayJoinedString = selectedcountries.map(country => `&refine=cou_name_en:"${country}"`).join('');
                finalURL += `${filterCountryArrayJoinedString}`
            }
            if (selectedtimezone.length > 0) {
                const filterTimeZoneArrayJoinedString = selectedtimezone.map(time => `&refine=timezone:"${time}"`).join('');
                finalURL += `${filterTimeZoneArrayJoinedString}`
            }
            if (search) {
                finalURL += `&where="${search}"`
            }

            setIsloading(true) //TO FIND THE API CALL TIME AND PRINT LOADING WHILE PROMISE PENDING
            const response = await axios.get(finalURL)
            if(response.data.results.length==0){
                setNoData(true)
            }else{
                setNoData(false)
            }
            setcity((previous) => [...previous, ...response.data.results])
            setoffset((pvs) => pvs + 20)

        } catch (error) {
            console.error(error);
            toast.error("Something Went Wrong")
            setError(error)
            
        }
        finally {
            setIsloading(false) //API RESULT COMES MEANS PROMISE END AND IT MARKED AS FALSE TO REMOVE LOADING..
        }
    }

    const handleScroll = () => {
        const { scrollTop, offsetHeight, scrollHeight } = tableRef.current; //THIS DIV CURRENT PROPETIES WILL GIVE SCROLL VALUES ,SO DESTRUCTURE IT AND USE ALTERNATIVELY
        //scrollTop=no of px scrolled vertically form the messure from top , offsetHeight=fixed heigtht of element or  , scrollheight=total height of content including overflow
        if (scrollTop + 2 + offsetHeight >= scrollHeight) {
            allCity()
        }
    }

    const searchFunction = (value) => {
        setsearch(value)
        setoffset(0)
        setcity([])
    }

    if (!city) { //IF THE CITY IS NOT FETCHED 
        return(
            <>
            <div id="loader"></div> 
            </>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-5 px-2  md:px-24">
                <div id="searchDiv" >
                    <label className=" font-semibold " htmlFor="">SEARCH</label>
                    <input onChange={(e) => searchFunction(e.target.value)} value={search} className="px-3 py-1 ml-6 rounded-lg" type="search" name="city" id="" placeholder="City Name" />
                </div>
                <div className="block lg:flex lg:gap-6">
                    <div className="tableContainer  overflow-y-auto overflow-x-auto lg:w-7/12" style={{ maxHeight: 599 }} ref={tableRef} onScroll={handleScroll}>
                        <table className=" w-full">
                            <thead className=" bg-black text-white text-left sticky top-0">
                                <tr className="">
                                    <th className="p-3 w-6/12"><span>City Name</span><span onClick={() => sortFuction('name')} className="inline-block text-lg pl-3"><FaSort /></span></th>
                                    <th className="p-3 w-3/12"><span>Country</span><span onClick={() => sortFuction('cou_name_en')} className="inline-block  pl-3"><FaSort /></span></th>
                                    <th className="p-3 w-3/12"><span>TimeZone</span><span onClick={() => sortFuction('timezone')} className="inline-block  pl-3"><FaSort /></span></th>
                                </tr>
                            </thead>
                           
                            <tbody >
                                {city.map((cities, index) => { //*CREATED A SEPERATE COMPONENT FOR DISPLAYING EACH TABLE ROWS
                                    return <TableBody key={cities.geoname_id + index} city={cities} />
                                })}
                            </tbody>
                        </table>
                        {/* LOADING IS ONLY TRUE WHEN THE FETCH CALLING IS WAITING */}
                        {noData && <h1 id="loading" className="text-white font-semibold p-3" >Currently Unavailable</h1>}
                        {isLoading && <h1 id="loading" className="text-white font-semibold p-3" >Loading...</h1>}
                    </div>
                      {/* CREATED ANOTHER COMPONENT FOR FILTER SECTION */}
                    <Filter selectedCountryLiftUp={selectedCountryLiftUp} selectedcountries={selectedcountries} selectedTimeLiftUp={selectedTimeLiftUp} selectedtimezone={selectedtimezone} />
                </div>
            </div>
            <div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Table;