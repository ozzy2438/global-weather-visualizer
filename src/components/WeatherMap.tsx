import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useWeather } from '../context/WeatherContext';
import L from 'leaflet';

const WeatherMap: React.FC = () => {
  const { currentWeather, fetchWeatherData } = useWeather();
  const [center, setCenter] = useState<[number, number]>([20, 0]);
  const [rotation, setRotation] = useState<number>(0);

  const MapControls = () => {
    const map = useMap();

    React.useEffect(() => {
      const width = map.getSize().x;
      const height = map.getSize().y;
      
      const projection = L.CRS.EPSG3857.projection;
      projection._project = function(latlng: L.LatLng) {
        const d = Math.PI / 180;
        const lat = latlng.lat * d;
        const lng = (latlng.lng + rotation) * d;
        const radius = width / (2 * Math.PI);
        
        const x = radius * Math.cos(lat) * Math.sin(lng);
        const y = radius * Math.sin(lat);
        
        return new L.Point(x + width / 2, height / 2 - y);
      };

      map.options.crs = L.CRS.EPSG3857;
      map.setView(center, 3);
    }, [rotation]);

    const mapEvents = useMapEvents({
      drag: () => {
        const center = map.getCenter();
        setCenter([center.lat, center.lng]);
        setRotation((rotation + 1) % 360);
        map.invalidateSize();
      },
      click: (e) => {
        const { lat, lng } = e.latlng;
        fetchWeatherData(lat, lng);
      }
    });

    return null;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Interactive Globe View</h2>
      <div className="h-[600px] w-full rounded-lg overflow-hidden relative">
        <MapContainer
          center={center}
          zoom={3}
          className="h-full w-full rounded-lg"
          minZoom={2}
          maxZoom={6}
          scrollWheelZoom={true}
          dragging={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            noWrap={true}
          />
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
        Drag the map to rotate the globe. Click anywhere to see weather details.
      </p>
    </div>
  );
};

export default WeatherMap;