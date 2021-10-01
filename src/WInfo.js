import React from "react";
import { useState } from "react";
import "./WInfo.css";
import Forecast from "./Forecast";

const api = {
	key: "ae9e15e6e0d244b77e6afc4ea6c67a72",
	base: "https://api.openweathermap.org/data/2.5/",
};

function WInfo() {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});
	const [forecast, setForecast] = useState(null);

	const search = (evt) => {
		if (evt.key === "Enter") {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery("");
					console.log(result);
				});

			fetch(
				"https://api.openweathermap.org/data/2.5/onecall?lat=26.144&lon=91.732&exclude=minutely,hourly&appid=ae9e15e6e0d244b77e6afc4ea6c67a72"
			)
				.then((res) => res.json())
				.then((result) => {
					setForecast(result.daily);
					console.log(result);
				});
		}
	};

	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};
	return (
		<div
			className={
				typeof weather.main != "undefined"
					? weather.main.temp > 16
						? "app warm"
						: "app"
					: "app"
			}>
			<div className='searchBar'>
				<input
					type='text'
					className='inputBox'
					placeholder='Search...'
					onChange={(e) => setQuery(e.target.value)}
					value={query}
					onKeyPress={search}
				/>
			</div>
			{typeof weather.main != "undefined" ? (
				<div className='wInfo'>
					<div className='card'>
						<div className='location-box'>
							<div className='location'>
								{weather.name}, {weather.sys.country}
							</div>
							<div className='date'>{dateBuilder(new Date())}</div>
						</div>
						<div className='weather-box'>
							<div className='temp'>{Math.round(weather.main.temp)}°C</div>
							<div>
								<img
									src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
									className='weather-icon'
									alt='Not Found'
								/>
							</div>
							<div className='weather'>{weather.weather[0].main}</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}

			{forecast && <Forecast forecast={forecast} />}
		</div>
	);
}

export default WInfo;
