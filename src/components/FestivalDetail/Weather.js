import { useState, useEffect } from "react";

const Weather = ({ lat, lon }) => {
  const [todayWeather, setTodayWeather] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (!lat || !lon) return;

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        let tempMin = Infinity;
        let tempMax = -Infinity;
        let icon = null;

        data.list.forEach(item => {
          const date = item.dt_txt.split(' ')[0];
          if (date === today) {
            tempMin = Math.min(tempMin, item.main.temp_min);
            tempMax = Math.max(tempMax, item.main.temp_max);
            if (!icon) icon = item.weather[0].icon; // 첫 아이콘 사용
          }
        });

        if (tempMin !== Infinity && tempMax !== -Infinity) {
          setTodayWeather({
            temp_min: tempMin.toFixed(1),
            temp_max: tempMax.toFixed(1),
            icon
          });
        }
      })
      .catch(err => console.error(err));
  }, [lat, lon, apiKey]);

  if (!todayWeather) return <div>날씨 로딩 중...</div>;

  return (
    <div className="weather-today">
      <img
        src={`https://openweathermap.org/img/wn/${todayWeather.icon}@2x.png`}
        alt="날씨 아이콘"
        style={{ width: "40px", height: "40px", objectFit: "contain", paddingRight: "5px" }}
        className="weather-icon"
      />
      <p>{todayWeather.temp_min}°</p>
      <div className="line"></div>
      <p>{todayWeather.temp_max}°</p>
    </div>
  );
};

export default Weather;
