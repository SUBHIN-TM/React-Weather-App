import './App.css'
import Home from './Comopnents/Home';
import backgroundImage from '../src/assets/Back.jpg'

function App() {
  const backgroundStyle ={
    backgroundImage:`url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '708px'
  }
  return (
       <div style={backgroundStyle}>
       <Home />
       </div>
      
     
  )
}
export default App
