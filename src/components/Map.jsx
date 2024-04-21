import { useState, useEffect } from 'react';
import {
    MapContainer,
    TileLayer,
    Polyline,
    Marker,
    Popup,
    useMap,
} from 'react-leaflet';
import L, { Icon } from 'leaflet';
import { trailinfo } from '../assets/sample_traildata';

function ChangeBounds({ bounds }) {
    const map = useMap();
    useEffect(() => {
        map.fitBounds(bounds);
    }, [bounds]);
}

export function Map({
    marker = trailinfo.center, // format: [11.00, 11.00] (set to undefined for no marker)
    polyline = trailinfo.coords, // format: list[center, center]
}) {
    const [bounds, setBounds] = useState(
        L.polyline(polyline).getBounds().extend(marker)
    );

    useEffect(() => {
        let bounds = L.polyline(polyline).getBounds().extend(marker);
        setBounds(bounds);
    }, [polyline, marker]);

    const squirrelIcon = new Icon({
        iconUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPYKVkF8iYGZABykJXWOMk6pvvhig4bVd_F8BhGNcjA&s',
        iconSize: [30, 30], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    const deerIcon = new Icon({
        iconUrl:
            'https://upload.wikimedia.org/wikipedia/commons/7/76/The_deer_of_all_lands_%281898%29_Mule_deer_white_background.png',
        iconSize: [30, 30], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    const lionIcon = new Icon({
        iconUrl:
            'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL3Jhd3BpeGVsX29mZmljZV8yNl9waG90b19vZl9hX21vdW50YWluX2xpb25fd2Fsa2luZ19zaWRlX3ZpZXdfaV84MjJmYTE5My00Mzc0LTRhMDQtOGQxYy01MDE1M2Q5NDMwZDMucG5n.png',
        iconSize: [30, 30], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    const raccoonIcon = new Icon({
        iconUrl:
            'https://p7.hiclipart.com/preview/125/519/770/raccoon-squirrel-trapping-cat-raccoon.jpg',
        iconSize: [30, 30], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    return (
        <>
            <MapContainer
                className="w-full h-full rounded-3xl z-0"
                zoom={11}
                scrollWheelZoom={false}
                preferCanvas={true}
                bounds={bounds}
                boundsOptions={{ padding: [20, 20] }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline positions={polyline} />
                {marker != null && <Marker position={marker} />}

                {/* custom icons */}
                <Marker position={[33.891729, -117.691425]} icon={squirrelIcon}>
                    <Popup>
                        Squirrels can find food buried beneath a foot of snow.
                    </Popup>
                </Marker>
                <Marker position={[33.890101, -117.691167]} icon={deerIcon}>
                    <Popup>
                        Mule Deer can reach speeds of up to 45 miles per hour.
                    </Popup>
                </Marker>
                <Marker position={[33.890591, -117.692927]} icon={lionIcon}>
                    <Popup>
                        Mountain Lions have powerful hind legs enable them to
                        jump as far as 40 to 45 feet.
                    </Popup>
                </Marker>
                <Marker position={[33.893352, -117.693785]} icon={raccoonIcon}>
                    <Popup>Raccoon's masks are anti-glare devices.</Popup>
                </Marker>

                <ChangeBounds bounds={bounds} />
            </MapContainer>
        </>
    );
}
