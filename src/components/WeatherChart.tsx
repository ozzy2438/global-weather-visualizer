import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { useWeather } from '../context/WeatherContext';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg">
        <p className="text-gray-300 mb-1">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: item.color }}>
            {item.name}: {item.value} {item.name === 'Temperature' ? '°C' : '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const WeatherChart: React.FC = () => {
  const { forecast } = useWeather();

  if (!forecast) return null;

  const data = forecast.list.slice(0, 8).map(item => ({
    time: format(new Date(item.dt * 1000), 'HH:mm'),
    temperature: Math.round(item.main.temp),
    humidity: item.main.humidity
  }));

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-bold mb-6 text-white">24-Hour Forecast</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis yAxisId="left" stroke="#94a3b8" />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2 }}
              name="Temperature"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2 }}
              name="Humidity"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherChart;