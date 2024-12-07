# Global Weather Visualization Application 🌍

An interactive, real-time weather visualization application built with React, TypeScript, and modern web technologies. This project features a unique orthographic globe projection that allows users to explore weather conditions worldwide through an intuitive interface.

![Application Preview](https://images.unsplash.com/photo-1590552515252-3a5a1bce7bed?w=800&auto=format&fit=crop&q=80)

## 🌟 Key Features

- **Interactive 3D Globe Visualization**
  - Orthographic projection with smooth rotation
  - Click-to-view weather data for any location
  - Real-time weather updates

- **Comprehensive Weather Data**
  - Current weather conditions
  - 24-hour forecast
  - Temperature and humidity trends
  - Wind speed and direction

- **Modern UI/UX**
  - Sleek dark theme design
  - Responsive layout
  - Interactive charts and visualizations
  - Real-time data updates

## 🛠️ Technologies Used

- **Frontend Framework**: React with TypeScript
- **Mapping**: Leaflet.js with custom orthographic projection
- **Weather Data**: OpenWeatherMap API
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Date Handling**: date-fns

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd global-weather-visualization
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your OpenWeatherMap API key:
     ```
     VITE_WEATHER_API_KEY=your_api_key_here
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── CurrentWeather.tsx
│   ├── WeatherChart.tsx
│   └── WeatherMap.tsx
├── context/             # Global state management
│   └── WeatherContext.tsx
├── types/               # TypeScript definitions
│   └── weather.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🎯 Core Components

1. **WeatherMap**
   - Interactive globe visualization
   - Custom orthographic projection
   - Click-to-view weather data

2. **CurrentWeather**
   - Displays current weather conditions
   - Temperature, humidity, wind speed
   - Weather description and icons

3. **WeatherChart**
   - 24-hour forecast visualization
   - Temperature and humidity trends
   - Interactive tooltips

## 🔄 Data Flow

1. User interacts with the globe
2. Click event triggers API call to OpenWeatherMap
3. Weather context updates with new data
4. Components re-render with updated information
5. Charts and visualizations reflect new data

## 🎨 Design Features

- **Dark Theme**
  - Professional dark color scheme
  - High contrast for readability
  - Subtle gradients and shadows

- **Interactive Elements**
  - Smooth animations
  - Responsive hover states
  - Clear visual feedback

- **Data Visualization**
  - Clean, modern charts
  - Intuitive color coding
  - Clear typography hierarchy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenWeatherMap for providing weather data
- Leaflet.js community for mapping tools
- React and TypeScript teams for excellent documentation
