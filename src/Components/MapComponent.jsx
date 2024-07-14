import React, { useState,useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = ({ data }) => {
  const mapRef = useRef(null);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    const areas = Array.from(new Set(data.map((d) => d.area)));
    if (areas.length === 1) {
      setSelectedArea(areas[0]);
    } else {
      setSelectedArea(null);
    }
    if (mapRef.current && data.length > 0) {
      // Extract unique areas from the crime data
      const uniqueAreas = [...new Set(data.map((crime) => crime.area))];

      // If there is only one unique area and it has subAreaLocation defined for all crimes in that area
      if (
        uniqueAreas.length === 1 &&
        data.every((crime) => crime.subAreaLocation)
      ) {
        // Extract coordinates including both location and subAreaLocation
        let coordinates = [];
        data.forEach((crime) => {
          coordinates.push(crime.location);
          coordinates.push(crime.subAreaLocation);
        });

        // Calculate bounds
        const bounds = L.latLngBounds(coordinates);

        // Fit bounds to the map
        mapRef.current.fitBounds(bounds);
      } else {
        // Default to fit bounds based on all locations
        const coordinates = data.map((crime) => crime.location);
        const bounds = L.latLngBounds(coordinates);
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [data]);

  return (
    <MapContainer
      ref={mapRef}
      center={[19.7515, 75.7139]}
      zoom={7}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {selectedArea == null && data.map((crime) => (
        <Marker key={crime.id} position={crime.location}>
          <Popup>
            {crime.type} - {crime.subtype} <br /> {crime.area}
          </Popup>
        </Marker>
      ))}
      {/* Render subAreaLocation markers if all crimes have the same area and subAreaLocation is defined */}
      {data.length > 0 &&
        data.every((crime) => crime.subAreaLocation) &&
        [...new Set(data.map((crime) => crime.area))].length === 1 &&
        data.map((crime) => (
          <Marker key={`${crime.id}-sub`} position={crime.subAreaLocation}>
            <Popup>
              {crime.type} - {crime.subtype} <br /> {crime.area} -{" "}
              {crime.subArea}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
