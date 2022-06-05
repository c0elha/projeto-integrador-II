import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
const position = [51.505, -0.09];
import { api } from './../../src/services/api';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface PreviewImage {
    name: string;
    url: string;
}

interface Category {
    id: number;
    name: string;
    description: string;
}

const MapIndex = ({ occurrences }) => {

    const [initialPosition, setInitialPosition] = useState<[number, number]>([-21.6732613, -49.74705934]);

    useEffect(() => {

    }, []);

    return (
        <MapContainer
            center={initialPosition}
            zoom={15}
            style={{ width: '100%', height: 280 }}
        >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=sk.eyJ1IjoiZ2VvdmFuYWNvZWxobyIsImEiOiJjbDQycmJzdTg0bG05M2RsOHAycHl1Nm5jIn0.eegan_Kz-MQ4bsFngXBU4A`}
            />
            {occurrences.map((occurrence) => {
                return (
                    <Marker
                        title="Clique para mais detalhes"
                        key={occurrence.id}
                        position={[occurrence.latitude, occurrence.longitude]}
                    >
                        <Popup
                            closeButton={false}
                            minWidth={240}
                            maxWidth={240}
                            className="map-popup"
                        >
                            {occurrence.title}

                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default MapIndex;
