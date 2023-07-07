import React, { useState } from 'react'
import "./Home.scss"
import axios from 'axios' 

const Home = () => {
  const [data, setData] = useState({});

  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    if(name !== "") {
      async function getWeather() {
        try {
          const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=264dd0a7abbe75e34c56b1bbdc08b685`
          const data = await axios.get(APIurl);
          let imagePath  = '';
          if(data.data.weather[0].main === "Clouds") {
            imagePath = '/assets/images/clouds.png';
          } else if (data.data.weather[0].main === "Clear") {
            imagePath = '/assets/images/clear.png';
          } else if (data.data.weather[0].main === "Rain") {
            imagePath = '/assets/images/rain.png';
          } else if (data.data.weather[0].main === "Drizzle") {
            imagePath = '/assets/images/drizzle.png';
          } else if (data.data.weather[0].main === "Mist") {
            imagePath = '/assets/images/mist.png';
          } else {
            imagePath = '/assets/images/clouds.png';
          }

          setData({
            celcius: data.data.main.temp, 
            name: data.data.name, 
            humidity: data.data.main.humidity, 
            speed: data.data.wind.speed,
            image: imagePath})

          setError('');
          setIsShown(true);

        } catch (error) {
          if (error.response.status === 404) {
            setError('Invalid City Name')
            setIsShown(false);
          } else  {
            setError('');
          }
        }
      } 
      getWeather();
    }
  }

  return (
    <div className='container'>
      <div className="weather">
        <div className="weather-search">
          <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
          <button onClick={handleClick}><img src="/assets/images/search.png" /></button>
        </div>
        <div className="weather-error">
          <p>{error}</p>
        </div>
        {isShown && ( <div className="weather-info">
          <img src={data.image} />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="weather-info-details">
            <div className="weather-info-details-col">
              <img src="/assets/images/humidity.png" />
              <div className="weather-info-details-col-humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div id='wind' className="weather-info-details-col">
              <img src="/assets/images/wind.png" />
              <div className="weather-info-details-col-wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div> )}
      </div>
    </div>
  )
}

export default Home