import { useEffect, useState } from "react";
import axios from "axios"

const Filter = ({selectedCountryLiftUp,selectedcountries,selectedTimeLiftUp,selectedtimezone}) => {
    const [more1, setmore1] = useState(false)
    const [more2, setmore2] = useState(false)

    useEffect(() => {
        fetchFilter()
    }, [])


    const [allTime, setallTime] = useState([])
    const [allCountry, setallCountry] = useState([])

    let fetchFilter = async () => {
        try {
            const [country, timezone] = await Promise.all([ //GETTING ALL COUNTRY AND TIMEZONE TO LIST IN FILTER SECTION
                axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=cou_name_en&group_by=cou_name_en'),
                axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=cou_name_en&group_by=timezone')
            ]) 
            setallCountry(country.data.results.map((data) => data?.cou_name_en).filter((name) => name))
            setallTime(timezone.data.results.map((data) => data?.timezone))
        } catch (error) {
            console.error(error);
        }
    }

     const conutrySelecting=(checkedCntry)=>{ //CHECK BOX COUNTRY SELECTING
        if(selectedcountries.includes(checkedCntry)){
       const selected=selectedcountries.filter((cntry)=> cntry !=checkedCntry)
         selectedCountryLiftUp(selected)
        }else{
            selectedCountryLiftUp([...selectedcountries,checkedCntry])
        }  
     }


     const timeSelecting=(checkedTime)=>{//CHECK BOX Time SELECTING
        if(selectedtimezone.includes(checkedTime)){
        const selected=selectedtimezone.filter((time)=> time !=checkedTime)
        selectedTimeLiftUp(selected)
        }else{
            selectedTimeLiftUp([...selectedtimezone,checkedTime])
        }  
     }


    return (
        <>
            <div id="filterSection" className="my-11 md:my-0 overflow-hidden md:w-9/12 lg:w-7/12 xl:7/12 lg:mt-0  flex  xl:mt-0 font-semibold mt-9 ">
                <div id="countryFilterBox" className=" w-6/12">
                    <h1 className="mb-3 pl-8 text-white py-3 bg-black ">Country Name</h1>
                    {allCountry.slice(0, 21).map((data) => {
                        return (                 
                                <div className="flex" key={data}>
                                    <input  type="checkbox" name="" id={data} className="mx-3 " 
                                      onChange={(e)=>conutrySelecting(e.target.id)}/>
                                    <label className="" htmlFor={data}>{data}</label>
                                </div>
                        )
                    })}
                    {more1 &&
                        allCountry.slice(23, 50).map((data) => {
                            return (                  
                                    <div className="flex" key={data}>
                                        <input type="checkbox" name="" id={data} className="mx-3" 
                                           onChange={(e)=>conutrySelecting(e.target.id)}/>
                                        <label htmlFor={data}>{data}</label>
                                    </div>
                            )
                        }
                        )}

                    {more2 &&
                        allCountry.slice(51).map((data) => {
                            return (
                               
                                    <div className="flex" key={data}>
                                        <input type="checkbox" name="" id={data} className="mx-3"
                                           onChange={(e)=>conutrySelecting(e.target.id)} />
                                        <label htmlFor={data}>{data}</label>
                                    </div>           
                            )
                        }
                        )}

                    <div className="text-white">
                        {more2 ? "" : more1 ? (<button onClick={() => setmore2(true)} className="mx-2 text-blue-700">🔽 More </button>): <button onClick={() => setmore1(true)} className="mx-2 text-blue-700">🔽 More </button>}
                    </div>

                </div>
                <div className="  w-6/12 ">
                    <h1 className="mb-3 pl-8 bg-black text-white py-3">Tme Zone</h1>
                    {allTime.slice(0, 22).map((data) => {
                        return (               
                                <div className="flex" key={data}>
                                    <input type="checkbox" name="" id={data} className="mx-3"
                                      onChange={(e)=>timeSelecting(e.target.id)} />
                                    <label htmlFor={data}>{data}</label>
                                </div>
                        )
                    })}
                    {more1 &&
                        allTime.slice(24, 51).map((data) => {
                            return (
                              
                                    <div className="flex" key={data}>
                                        <input type="checkbox" name="" id={data} className="mx-3" 
                                          onChange={(e)=>timeSelecting(e.target.id)} />
                                        <label htmlFor={data}>{data}</label>
                                    </div>                       
                            )
                        }
                        )}

                    {more2 &&
                        allTime.slice(52,230).map((data) => {
                            return (
                              
                                    <div className="flex" key={data}>
                                        <input type="checkbox" name="" id={data} className="mx-3" 
                                           onChange={(e)=>timeSelecting(e.target.id)} />
                                        <label htmlFor={data}>{data}</label>
                                    </div>                       
                            )
                        }
                        )}
                         <div className="text-white">
                        {more2 ? (<button onClick={() => setmore2(false)} className="mx-2  text-blue-700">🔼 Less</button>) : more1 ? (<button onClick={() => setmore1(false)} className="mx-2  text-blue-700">🔼 Less</button>) : ""}

                    </div>
                </div>
            </div>

        </>
    )
}

export default Filter;