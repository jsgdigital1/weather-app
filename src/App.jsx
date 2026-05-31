import { useState } from 'react'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

async function fetchWeather() {
  console.log(import.meta.env.VITE_WEATHER_API_KEY)
  const key = import.meta.env.VITE_WEATHER_API_KEY
  const res = await fetch (
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
  )
  const data = await res.json()
  setWeather(`${data.name}: ${data.main.temp}F, ${data.weather[0].description}`)
}


  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "40px" }}>
      <h1>Weather App</h1>
      <input
       type="text"
       placeholder="Please enter a city."
       value={city}
       onChange={(e) => setCity(e.target.value)}/>
       <button onClick={fetchWeather}>Search</button>
       {weather && <p>{weather}</p>}
       </div>
  )
}

export default App
