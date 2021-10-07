import React, { useState, useEffect } from "react";
import "./Forecast.css";
import ForecastObj from "./components/ForecastObj";

function Forecast({ forecast, forecastType }) {
	// const [forecast, setForecast] = useState(null);

	// useEffect(() => {
	// 	fetch(
	// 		"https://api.openweathermap.org/data/2.5/onecall?lat=26.144&lon=91.732&exclude=minutely,hourly&appid=ae9e15e6e0d244b77e6afc4ea6c67a72"
	// 	)
	// 		.then((res) => res.json())
	// 		.then((result) => {
	// 			setForecast(result.daily);
	// 			console.log(result);
	// 		});
	// }, []);
	console.log(typeof forecast);
	return (
		<div className='forecast'>
			<div className='forecast-container'>
				{forecast &&
					forecast.map((f) => (
						<ForecastObj f={f} forecastType={forecastType} />
					))}
			</div>
		</div>
	);
}

export default Forecast;
