import { useState, useEffect } from "react"
import LocationMarker from "./LocationMarker"
import LocationInfoBox from "./LocationInfoBox"
import mapboxgl from "mapbox-gl"
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import RoomIcon from "@material-ui/icons/Room"

//eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default

const Map = () => {

    const [eventData, setEventData] = useState([])
    const [loading, setLoading] = useState(false)
  
    useEffect(()=> {
      const fetchEvents = async () => {
        setLoading(true)
        const res = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events")
        const { events } = await res.json()
        console.log(events)
        setEventData(events)
        setLoading(false)
      }
  
      fetchEvents()
    }, [])
    const [locationInfo, setLocationInfo] = useState(null)
    const [selectEvent, setSelectEvent] = useState(8)
    const [viewPort, setViewPort] = useState({
        height: "100vh",
        width: "100vw",
        laditude: 46,
        longitude: 12,
        zoom:3
    })
    console.log (eventData)
    const markers = eventData.map((ev, index) => {
        if(ev.categories[0].id === selectEvent) {
            return <LocationMarker key={index} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]}
            onClick={() => setLocationInfo({ id: ev.id, title: ev.title })} />
        }
        return null
    })

    return (
        <div className="map">
            <div>
                <select onChange={(e) => setSelectEvent(parseInt(e.target.value))}>
                    <option value="8">Wildfire</option> 
                    <option value="10">Storms</option>
                </select>
            </div>

            <ReactMapGL
                {...viewPort}
                width="100vw"
                height="100vh"
                transitionDuration="35"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={(viewport) => setViewPort(viewport)}
                mapStyle="mapbox://styles/anisha2021/cktn04wo01nu318utj0oqqz37">

                {eventData && eventData.map((ev, index) => {
                    if(
                        ev.categories[0].id ===selectEvent&&
                        ev.geometries[0].coordinates[1]
                    )
                    return(
                        <Marker
                            key={index}
                            latitude={ev.geometries[0].coordinates[1]}
                            longitude={ev.geometries[0].coordinates[0]}
                            offsetLeft={-viewPort.zoom*3.5}
                            offsetTop={-viewPort.zoom*7}>
                                <RoomIcon 
                                    style={{
                                        fontSize: viewPort.zoom*7,
                                        color: "slateblue",
                                        cursor: "pointer"
                                    }}
                                />
                        </Marker>
                    )
                })}
            </ReactMapGL>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
            
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 6
}

export default Map

