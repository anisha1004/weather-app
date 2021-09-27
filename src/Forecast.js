import React,{useState, useEffect} from 'react'
import "./Forecast.css"

function Forecast() {

    const [forecast, setForecast] = useState({})

    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=26.144&lon=91.732&exclude=minutely,hourly&appid=ae9e15e6e0d244b77e6afc4ea6c67a72')
        .then(res => res.json())
        .then(result => {
            setForecast(result.daily);
            console.log(result);
        })

    },[])
    return (
        <div className="forecast">
            <div className="forecast-conatiner">
                <div></div>
            </div>
        </div>
    )
}

export default Forecast
