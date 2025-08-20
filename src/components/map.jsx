import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet"
import { useNavigate, useSearchParams } from "react-router-dom"

const ChangeCenter = ({ position }) => {
  const map = useMap()
  map.setView(position)
  return null
}

const ChangeToClickedCity = () => {
  const navigate = useNavigate()
  const id = crypto.randomUUID()
  useMapEvents({
    click: (e) =>
      navigate(
        `cities/${id}/edit?latitude=${e.latlng.lat}&longitude=${e.latlng.lng}`,
      ),
  })
}

const beloHorizontePosition = {
  latitude: "-19.917622853492556",
  longitude: "-43.94031082020503",
}

const Map = ({ cities }) => {
  const [searchParams] = useSearchParams()
  const [latitude, longitude] = ["latitude", "longitude"].map((item) =>
    searchParams.get(item),
  )

  return (
    <div className="map">
      <MapContainer
        center={[
          beloHorizontePosition.latitude,
          beloHorizontePosition.longitude,
        ]}
        zoom={11}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map(({ id, position }) => (
          <Marker key={id} position={[position.latitude, position.longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}

        {latitude && longitude && (
          <ChangeCenter position={[latitude, longitude]} />
        )}
        <ChangeToClickedCity />
      </MapContainer>
    </div>
  )
}

export default Map
