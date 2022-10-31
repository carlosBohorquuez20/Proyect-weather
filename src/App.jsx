import { useState, useEffect, CSSProperties } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import Typewriter from "typewriter-effect";
import HashLoader from "react-spinners/HashLoader";
function App() {
  const [weather, setWeather] = useState({});
  const [ischange, setIsChange] = useState(true)
  const [isChangeGrados, setChangeGrados] = useState(true);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)

    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude;
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c66d871a6f55f8a9ce76d475ad3ba01`)
        .then((res) => setWeather(res.data));
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  const [loading, setLoading] = useState(false);

  const source = document.createElement('source')
  const screen = document.getElementById('screen')
  screen.appendChild(source);


  switch (weather.weather?.[0].main) {
    case "Thunderstorm":
      source.src = './src/assets/video/thunder.mp4';
      break;

    case "Clouds":
      source.src = './src/assets/video/clouds.mp4';
      break;

    case "Rain":
      source.src = './src/assets/video/rain.mp4';
      break;

    case "Snow":
      source.src = './src/assets/video/snow.mp4';
      break;

    case "Clear":
      source.src = './src/assets/video/sunny.mp4';
      break;
  }

  const gradosKelvin = weather.main?.temp
  const gradosCentigrados = parseInt(gradosKelvin - 273.15);
  const gradosFahrenheit = parseInt(1.8 * (gradosKelvin - 273.15) + 32);
  const convertion = () => {
    setIsChange(!ischange)
    setChangeGrados(!isChangeGrados)
  }

  console.log(weather);

  return (
    <>
      {loading ?
        <HashLoader
          color={"#123abc"}
          loading={loading}
          size={150}
        />
        :
        <div className='weather-box'>
          <div className="App">
            <div className='content-box'>
              <div className='top-content'>
                <h1>Weather App</h1>
                <p>{weather.name}, {weather.sys?.country}</p>
              </div>
              <div className='info'>
                <div className='left'>
                  <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} className="icon-weather" alt="icons weather" />
                  <h2>{ischange ? gradosFahrenheit : gradosCentigrados} {isChangeGrados ? "°F" : "°C"} </h2>
                  <button className='btn' onClick={convertion}>Change °F / °C</button>
                </div>
                <div className='right'>
                  <div className='description'>
                    <h4>{weather.weather?.[0].description.toUpperCase()}</h4>
                  </div>
                  <div className='info-icon'>
                    <i className="fa-solid fa-wind"></i>
                    <p className='text-info'>Wind speed: {weather.wind?.speed} m/s</p>
                  </div>
                  <div className='info-icon'>
                    <i className="fa-solid fa-cloud"></i>
                    <p className='text-info'>Clouds: {weather.clouds?.all} %</p>
                  </div>
                  <div className='info-icon'>
                    <i className="fa-solid fa-droplet"></i>
                    <p className='text-info'>Humidity: {weather.main?.humidity} %</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='person-box'>
            <div>
              <img src="./src/assets/img/person.png" alt="person" className='person-config' />
            </div>
            <div className='bubble'>
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  strings: `Good morning everyone, today's weather has a temperature of ${ischange ? gradosFahrenheit : gradosCentigrados} ${isChangeGrados ? "°F" : "°C"} whit an wind speed of ${weather.wind?.speed} m/s, with a ${weather.clouds?.all}% probability of cloudy and a humidity of ${weather.main?.humidity}% `,
                }} />
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default App


