import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useWeather } from '../context/WeatherContext';
import { LeafletMouseEvent, Icon } from 'leaflet';

// Leaflet default icon sorunu için
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const WeatherMap: React.FC = () => {
  const { currentWeather, fetchWeatherData } = useWeather();
  const [marker, setMarker] = useState<[number, number] | null>(null);

  const MapControls = () => {
    const map = useMap();

    React.useEffect(() => {
      if (!map) return;

      const handleClick = (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        fetchWeatherData(lat, lng);
        
        // Tıklanan noktaya zoom yap
        map.setView([lat, lng], Math.max(map.getZoom(), 5), {
          animate: true,
          duration: 1
        });
      };

      map.on('click', handleClick);
      return () => {
        map.off('click', handleClick);
      };
    }, [map]);

    return null;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Interactive Globe View</h2>
      <div className="h-[600px] w-full rounded-lg overflow-hidden relative">
        <MapContainer
          center={[20, 0]}
          zoom={3}
          className="h-full w-full rounded-lg"
          minZoom={2}
          maxZoom={12}
          scrollWheelZoom={true}
          zoomControl={true}
          doubleClickZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {marker && (
            <Marker position={marker} icon={defaultIcon}>
              {currentWeather && (
                <Popup autoPan={true}>
                  <div className="text-gray-900">
                    <h3 className="font-bold">{currentWeather.name}</h3>
                    <p className="text-lg">{currentWeather.main.temp.toFixed(1)}°C</p>
                    <p>{currentWeather.weather[0].description}</p>
                    <p>Nem: {currentWeather.main.humidity}%</p>
                    <p>Rüzgar: {currentWeather.wind.speed} m/s</p>
                  </div>
                </Popup>
              )}
            </Marker>
          )}
          <MapControls />
        </MapContainer>
        {currentWeather && (
          <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-lg border border-gray-700 p-4 rounded-lg shadow-glow z-[1000]">
            <h3 className="font-bold text-lg text-white">{currentWeather.name}</h3>
            <p className="text-gray-300">{currentWeather.main.temp.toFixed(1)}°C</p>
            <p className="text-gray-400">{currentWeather.weather[0].description}</p>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-400 mt-4">
        Click anywhere on the map to see weather details.
      </p>
    </div>
  );
};

export default WeatherMap;