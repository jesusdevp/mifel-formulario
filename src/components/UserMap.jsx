import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export const UserMap = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then(setUsers)
            .catch((err) => console.error("Error al obtener usuarios", err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto h-[500px] mt-10 rounded-lg overflow-hidden shadow-md">
            <MapContainer
                center={[20.6736, -103.344]}
                zoom={2}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {users.map((user) => {
                    const lat = parseFloat(user.address.geo.lat);
                    const lng = parseFloat(user.address.geo.lng);

                    return (
                        <Marker key={user.id} position={[lat, lng]} icon={customIcon}>
                            <Popup>
                                <strong>{user.name}</strong><br />
                                {user.address.city}<br />
                                <em>{user.email}</em>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};
