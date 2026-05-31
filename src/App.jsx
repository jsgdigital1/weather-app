import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

async function fetchWeather() {
  setLoading(true)
  setWeather(null)
  setError('')
  console.log(import.meta.env.VITE_WEATHER_API_KEY)
  const key = import.meta.env.VITE_WEATHER_API_KEY
  const res = await fetch (
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
  )
  const data = await res.json()

if (data.cod !==200) {
  setError('City not found.')
  setLoading(false)
  return
}

  setWeather(`${data.name}: ${data.main.temp}F, ${data.weather[0].description}`)
  setLoading(false)
}


  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className="search-row">
      <input 
       className="search-input"
       type="text"
       placeholder="Please enter a city."
       value={city}
       onChange={(e) => setCity(e.target.value)}/>
       <button className="search-btn" onClick={fetchWeather}>Search</button>
       </div>


       {error && <p style={{ color: 'red' }}>{error}</p>}
       {loading && <p>Loading...</p>}
       {weather && <p>{weather}</p>}

       </div>
  )
}

export default App
