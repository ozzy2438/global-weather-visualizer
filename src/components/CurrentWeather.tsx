import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

const CurrentWeather: React.FC = () => {
  const { currentWeather, loading, error } = useWeather();

  if (loading) return <div className="text-center text-gray-300">Loading...</div>;
  if (error) return <div className="text-red-400 text-center">{error}</div>;
  if (!currentWeather) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{currentWeather.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
          alt={currentWeather.weather[0].description}
          className="w-16 h-16"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-4">
          <Thermometer className="text-primary w-6 h-6" />
          <div>
            <p className="text-sm text-gray-400">Temperature</p>
            <p className="font-bold text-white">{currentWeather.main.temp.toFixed(1)}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-4">
          <Cloud className="text-primary w-6 h-6" />
          <div>
            <p className="text-sm text-gray-400">Conditions</p>
            <p className="font-bold text-white">{currentWeather.weather[0].main}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-4">
          <Droplets className="text-primary w-6 h-6" />
          <div>
            <p className="text-sm text-gray-400">Humidity</p>
            <p className="font-bold text-white">{currentWeather.main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-4">
          <Wind className="text-primary w-6 h-6" />
          <div>
            <p className="text-sm text-gray-400">Wind Speed</p>
            <p className="font-bold text-white">{currentWeather.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;