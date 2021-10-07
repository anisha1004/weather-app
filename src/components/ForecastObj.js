import React from "react";
import "./ForecastObj.css";

function ForecastObj({ f, forecastType }) {
	// console.log(forecastType);
	return forecastType === "daily" ? (
		<div className='forecast-card'>
			<span>min:{f.temp.min}</span>
			<span>max:{f.temp.max}</span>
			<span>{f.weather[0].description}</span>
			<span>
				<img
					src={`http://openweathermap.org/img/w/${f.weather[0].icon}.png`}
					className='weather-icon'
					alt='Not Found'
				/>
			</span>
		</div>
	) : (
		<div className='forecast-card'>
			<span>min:{f.temp}</span>
			<span>max:{f.temp}</span>
			<span>{f.weather[0].description}</span>
			<span>
				<img
					src={`http://openweathermap.org/img/w/${f.weather[0].icon}.png`}
					className='weather-icon'
					alt='Not Found'
				/>
			</span>
		</div>
	);
}

export default ForecastObj;
