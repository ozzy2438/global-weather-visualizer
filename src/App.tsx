import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import WeatherMap from './components/WeatherMap';
import CurrentWeather from './components/CurrentWeather';
import WeatherChart from './components/WeatherChart';
import { Globe } from 'lucide-react';

function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-2xl font-bold text-white">Global Weather Visualization</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8">
            <WeatherMap />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CurrentWeather />
              <WeatherChart />
            </div>
          </div>
        </main>
      </div>
    </WeatherProvider>
  );
}

export default App;