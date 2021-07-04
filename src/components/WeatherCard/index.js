const WeatherCard = ({ data }) => {
  const convertDateTime = (dateString) =>
    new Date(dateString * 1000).toLocaleDateString("en-UK");

  return (
    <div className="card text-center bg-transparent px-4 py-3 me-4 mb-3 shadow-lg current-card">
      <h4 className="current-city pt-2" id="cityName">
        {data.name}
        <span id="currentDate">- {convertDateTime(data.dt)}</span>
        <div id="weatherIcon">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      </h4>
      <div id="temp" className="fw-bold current-weather-info py-2">
        Temperature:
        <span className="fw-normal"> {data.main.temp} </span>
      </div>
      <div id="humidity" className="fw-bold current-weather-info py-2">
        Humidity:
        <span className="fw-normal"> {data.main.humidity}%</span>
      </div>
      <div id="windSpeed" className="fw-bold current-weather-info py-2">
        Wind Speed:
        <span className="fw-normal"> {data.wind.speed} mph</span>
      </div>
    </div>
  );
};

export default WeatherCard;
