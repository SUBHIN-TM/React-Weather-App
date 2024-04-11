import { useEffect, useState } from "react";
import axios from "axios"

const Filter = () => {
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
            // console.log(country.data.results.flat(Infinity).map((data)=>data?.cou_name_en));     
            setallCountry(country.data.results.map((data) => data?.cou_name_en).filter((name) => name))
            // console.log(timezone.data.results.flat(Infinity).map((data)=>data?.timezone));
            setallTime(timezone.data.results.flat(Infinity).map((data) => data?.timezone))
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <div className="border  lg:w-4/12 w-fit  flex my-10 xl:mt-0 font-semibold ">
                <div className=" bg-yellow-300  pt-3">
                    <h1 className="mb-3 pl-8">Country Name</h1>
                    {allCountry.map((data,index) => {
                        return (
                            <>
                                <div className="flex" key={index}>
                                    <input type="checkbox" name="" id="" className="mx-3"/>
                                    <label htmlFor="">{data}</label>
                                </div>
                            </>

                        )
                    })}

                </div>
                <div className=" bg-emerald-300  pt-3 ">
                <h1 className="mb-3 pl-8">Tme Zone</h1>
                    {allTime.map((data,index) => {
                        return (
                            <>
                                <div className="flex" key={index}>
                                    <input type="checkbox" name="" id="" className="mx-3"/>
                                    <label htmlFor="">{data}</label>
                                </div>
                            </>

                        )
                    })}
                    </div>

            </div>
        </>
    )
}

export default Filter;