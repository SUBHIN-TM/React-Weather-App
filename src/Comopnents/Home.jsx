import Table from "./Table";


const Home=()=>{

    return(
        <>
        <div>
        <h1 className="font-semibold text-center text-2xl p-10">Weather App</h1>
        </div>
        <div className="pl-10 pr-10">
            <div><Table/></div>
        </div>
        
        </>
      
         
    )
}

export default Home;