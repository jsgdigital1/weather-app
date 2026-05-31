import { useState } from 'react'
import './App.css'

function DetailCard({ icon, label, value }) {
  return (
    <div className="detail-card">
      <span className="detail-icon">{icon}</span>
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  )
}

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchWeather() {
    setLoading(true)
    setWeather(null)
    setError('')
    const key = import.meta.env.VITE_WEATHER_API_KEY
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
    )
    const data = await res.json()

    if (data.cod !== 200) {
      setError('City not found.')
      setLoading(false)
      return
    }

    setWeather(data)
    setLoading(false)
  }


  return (
    <div className="app">
      <h1>Happy Weather</h1>

      <div className="search-row">
        <input
          className="search-input"
          type="text"
          placeholder="Please enter a city."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()} />

        <button
          className="search-btn"
          onClick={fetchWeather}
          disabled={loading}
        >Search
        </button>
      </div>


      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading && <p>Loading...</p>}

      {weather && (
        <div>
          <div className="weather-card">
            <h2 className="weather-city">{weather.name}</h2>
            <div className="weather-temp">{Math.round(weather.main.temp)}°F</div>
            <p className="weather-desc">{weather.weather[0].description}</p>
          </div>

          <div className="details-grid">
            <DetailCard icon="🌡️" label="Feels like" value={`${Math.round(weather.main.feels_like)}°F`} />
            <DetailCard icon="💧" label="Humidity" value={`${weather.main.humidity}%`} />
            <DetailCard icon="💨" label="Wind speed" value={`${Math.round(weather.wind.speed)} mph`} />
            <DetailCard icon="☁️" label="Cloud cover" value={`${weather.clouds.all} %`} />
          </div>
        </div>
      )}
    </div>
  )}

export default App
