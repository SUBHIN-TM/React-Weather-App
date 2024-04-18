import Table from "./Table";


const Home=()=>{
    return(
        <>
        <div className="pt-3">
        <h1 className="font-semibold text-center text-2xl py-6   xl:py-0 md:pt-3 ">Weather App</h1>
        </div>
        <div >
            <div ><Table/></div>
        </div>    
        </>     
    )
}

export default Home;