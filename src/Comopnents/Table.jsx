import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import TableBody from "./TableBody"
import { FaSort } from "react-icons/fa6";
import Filter from "./Filter";

const Table = () => {
    // console.log("Table");
    const [city, setcity] = useState([])
    const [sort, setsort] = useState("")
    const [offset, setoffset] = useState(0)
    const [selectedcountries,setselectedcountries]=useState([])
    const [selectedtimezone,setselectedtimezone]=useState([])
    const tableRef = useRef(null) //REFFERENCE FOR SCROLLABLE CONTROLLER
   
    let baseURL="https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?";

    useEffect(() => {
        allCity()
    }, [sort,selectedcountries,selectedtimezone])


    const selectedCountryLiftUp=(selectedCountries)=>{ 
        setselectedcountries(selectedCountries) 
        setoffset(0)
        setcity([])   
    }
    console.log("selectedcountries",selectedcountries);

    const selectedTimeLiftUp=(selectedTime)=>{ 
        setselectedtimezone(selectedTime)
        setoffset(0)
        setcity([])       
    }
    console.log("selectedTimes",selectedtimezone);
   





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
        console.log("api get called");
        try {
          //  let search=https://public.opendatasoft.com/explore/embed/dataset/geonames-all-cities-with-a-population-1000/table/?disjunctive.cou_name_en&sort=name&q=ko
            let response
            if(selectedcountries.length >0 || selectedtimezone.length >0){
                console.log("filter get");
                const refineParamsTime=selectedtimezone.map(time => `&refine=timezone:"${time}"`).join('');
                console.log("time url",refineParamsTime);
                const refineParams = selectedcountries.map(country => `&refine=cou_name_en:"${country}"`).join('');
                console.log("cntry url",refineParams);
                // console.log(`${baseURL}order_by=-cou_name_en&limit=20&offset=${offset}${refineParamsTime}`);
                if(sort){
                    response = await axios.get(`${baseURL}order_by=${sort}&limit=20&offset=${offset}${refineParamsTime}${refineParams}`)
                }else{
                    response = await axios.get(`${baseURL}limit=20&offset=${offset}${refineParamsTime}${refineParams}`)
                    // response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&refine=cou_name_en:"Algeria"&refine=cou_name_en:"Angola"`)
                }
             
                console.log("fiter respo",response.data.results);        
            }
            else if (sort) {//IF SORT SELECT IT WILL CALL
                console.log("sort call");
                response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=${sort}&limit=20&offset=${offset}`)
             
            } else { //IT IS A DEFAULT CALL WIHTOUT ANY SORTING
                console.log("none");
                // response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}`)
                response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where='ko'&limit=20&order_by=name`)
            }
           

            setTimeout(() => {
                setcity((previous) => [...previous, ...response.data.results])
                setoffset((pvs) => pvs + 20)
            }, 2000);

        } catch (error) {
            console.error(error);
        }
    }

    const handleScroll = () => {
        const { scrollTop, offsetHeight, scrollHeight } = tableRef.current; //THIS DIV CURRENT PROPETIES WILL GIVE SCROLL VALUES ,SO DESTRUCTURE IT AND USE ALTERNATIVELY
       //scrollTop=no of px scrolled vertically form the messure from top , offsetHeight=fixed heigtht of element or  , scrollheight=total height of content including overflow
    //    console.log("top",scrollTop); //
    //    console.log("off",offsetHeight);
    //    console.log("scr hit",scrollHeight);
       if (scrollTop+2 + offsetHeight >= scrollHeight) {
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
                <div className="block lg:flex lg:gap-6">
                    <div className="tableContainer  overflow-y-auto  lg:w-7/12" style={{ maxHeight: 599}} ref={tableRef} onScroll={handleScroll}>
                        <table className=" w-full">
                            <thead className=" bg-black text-white text-left sticky top-0">
                                <tr className="">
                                    <th className="p-3 w-6/12"><span>City Name</span><span onClick={() => sortFuction('name')} className="inline-block text-lg pl-3"><FaSort /></span></th>
                                    <th className="p-3 w-3/12"><span>Country</span><span onClick={() => sortFuction('cou_name_en')} className="inline-block  pl-3"><FaSort /></span></th>
                                    <th className="p-3 w-3/12"><span>TimeZone</span><span onClick={() => sortFuction('timezone')} className="inline-block  pl-3"><FaSort /></span></th>
                                </tr>
                            </thead>

                            <tbody >
                                {city.map((cities,index) => {
                                    return <TableBody key={cities.geoname_id+index} city={cities} />
                                })}

                            </tbody>
                        </table>
                        <h1 id="loading" className="text-white font-semibold p-3" >Loading...</h1>
                    </div>

                    <Filter selectedCountryLiftUp={selectedCountryLiftUp} selectedcountries={selectedcountries} selectedTimeLiftUp={selectedTimeLiftUp} selectedtimezone={selectedtimezone} />

                </div>

            </div >
        </>
    )
}

export default Table;