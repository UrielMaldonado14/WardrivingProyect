import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './NetworkMap.css';

// Componente para recentralizar el mapa cuando cambia la ubicación
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lon], map.getZoom());
  }, [center, map]);
  return null;
}

// Fix para los iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Iconos personalizados para diferentes tipos de red
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const openIcon = createCustomIcon('#48bb78');
const encryptedIcon = createCustomIcon('#f56565');

function NetworkMap({ networks, center }) {
  const getSignalColor = (rssi) => {
    if (rssi >= -50) return '#48bb78';
    if (rssi >= -60) return '#48bb78';
    if (rssi >= -70) return '#ed8936';
    return '#f56565';
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[center.lat, center.lon]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="leaflet-map"
      >
        <RecenterMap center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marcador de ubicación actual */}
        <Circle
          center={[center.lat, center.lon]}
          radius={50}
          pathOptions={{
            color: '#667eea',
            fillColor: '#667eea',
            fillOpacity: 0.3
          }}
        />
        
        {/* Marcadores de redes WiFi */}
        {networks.map((network, index) => (
          <React.Fragment key={index}>
            <Marker
              position={[network.lat, network.lon]}
              icon={network.security === 'OPEN' ? openIcon : encryptedIcon}
            >
              <Popup>
                <div className="popup-content">
                  <h3>{network.ssid}</h3>
                  <div className="popup-row">
                    <strong>MAC:</strong> {network.mac}
                  </div>
                  <div className="popup-row">
                    <strong>Señal:</strong> {network.rssi} dBm
                  </div>
                  <div className="popup-row">
                    <strong>Seguridad:</strong> 
                    <span className={`security-badge ${network.security === 'OPEN' ? 'open' : 'encrypted'}`}>
                      {network.security}
                    </span>
                  </div>
                  <div className="popup-row">
                    <strong>Ubicación:</strong><br/>
                    {network.lat.toFixed(6)}, {network.lon.toFixed(6)}
                  </div>
                </div>
              </Popup>
            </Marker>
            
            {/* Círculo que muestra el rango aproximado según la señal */}
            <Circle
              center={[network.lat, network.lon]}
              radius={Math.abs(network.rssi) * 2}
              pathOptions={{
                color: getSignalColor(network.rssi),
                fillColor: getSignalColor(network.rssi),
                fillOpacity: 0.1,
                weight: 1
              }}
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}

export default NetworkMap;

