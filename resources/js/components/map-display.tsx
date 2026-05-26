import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Waypoint {
    id: number;
    position: [number, number]; // [lat, lng]
    label: string;
}

interface MapProps {
    waypoints: Waypoint[];
}

export default function MapDisplay({ waypoints = [] }: MapProps) {
    const center: [number, number] = waypoints.length > 0 
        ? waypoints[0].position 
        : [51.505, -0.09];
    return (
        <MapContainer center={center} zoom={8} style={{ height: '100%', width: '100%' }}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            />
            
            {waypoints && waypoints.map((point) => (
                <Marker key={point.id} position={point.position}>
                    <Popup>{point.label}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
