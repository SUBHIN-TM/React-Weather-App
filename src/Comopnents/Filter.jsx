import { useEffect, useState } from "react";
import axios from "axios"

const Filter = () => {
    const [more1, setmore1] = useState(false)
    const [more2, setmore2] = useState(false)
   



    useEffect(() => {
        fetchFilter()
    }, [])


    const [allTime, setallTime] = useState([])
    const [allCountry, setallCountry] = useState([])

    let fetchFilter = async () => {
        try {
            const [country, timezone] = await Promise.all([
                axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=cou_name_en&group_by=cou_name_en'),
                axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=cou_name_en&group_by=timezone')
            ])
            // console.log(country.data.results);     
            setallCountry(country.data.results.map((data) => data?.cou_name_en).filter((name) => name))
            // console.log(timezone.data.results.flat(Infinity).map((data)=>data?.timezone));
            setallTime(timezone.data.results.map((data) => data?.timezone))
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <div id="filterSection" className="border-black border w-9/12 lg:w-4/12  flex my-10 xl:mt-0 font-semibold ">
                <div id="countryFilterBox" className=" w-6/12">
                    <h1 className="mb-3 pl-8 text-white py-3 bg-black ">Country Name</h1>
                    {allCountry.slice(0, 22).map((data) => {
                        return (
                           
                                <div className="flex" key={data}>
                                    <input  type="checkbox" name="" id={data} className="mx-3 " />
                                    <label className="" htmlFor={data}>{data}</label>
                                </div>
                         

                        )
                    })}
                    {more1 &&
                        allCountry.slice(23, 50).map((data) => {
                            return (
                              
                                    <div className="flex" key={data}>
                                        <input type="checkbox" name="" id={data} className="mx-3" />
                                        <label htmlFor={data}>{data}</label>
                                    </div>
                              

                            )
                        }
                        )}

                    {more2 &&
                        allCountry.slice(51).map((data) => {
                            return (
                               
                                    <div className="flex" key={data}>
                                        <input type="checkbox" name="" id={data} className="mx-3" />
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
                    {allTime.slice(0, 23).map((data) => {
                        return (
                          
                                <div className="flex" key={data}>
                                    <input type="checkbox" name="" id={data} className="mx-3" />
                                    <label htmlFor={data}>{data}</label>
                                </div>

                           
                        )
                    })}
                    {more1 &&
                        allTime.slice(24, 51).map((data) => {
                            return (
                              
                                    <div className="flex" key={data}>
                                        <input type="checkbox" name="" id={data} className="mx-3" />
                                        <label htmlFor={data}>{data}</label>
                                    </div>
                              
                            )
                        }
                        )}

                    {more2 &&
                        allTime.slice(52,231).map((data) => {
                            return (
                              
                                    <div className="flex" key={data}>
                                        <input type="checkbox" name="" id={data} className="mx-3" />
                                        <label htmlFor={data}>{data}</label>
                                    </div>
                               

                            )
                        }
                        )}
                         <div className="text-white">

                        { }
                        {more2 ? (<button onClick={() => setmore2(false)} className="mx-2  text-blue-700">🔼 Less</button>) : more1 ? (<button onClick={() => setmore1(false)} className="mx-2  text-blue-700">🔼 Less</button>) : ""}

                    </div>


                </div>
            </div>

        </>
    )
}

export default Filter;