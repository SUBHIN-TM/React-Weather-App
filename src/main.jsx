import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import WeatherPage from './Comopnents/WeatherPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={< App/>} />
        <Route path='/weather' element={< WeatherPage/>} />
    </Routes>
    </BrowserRouter>
   
)
