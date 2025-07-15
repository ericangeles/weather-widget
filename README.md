# Weather Widget Micro Frontend

A modern weather widget built with Vue 3, TypeScript, Vuetify, and Vite that displays current weather information for any city. This project has been configured as a micro frontend using Module Federation.

## Features

- Display current weather conditions with icons
- Search for weather by city name
- Show detailed weather information (temperature, humidity, wind speed, etc.)
- Responsive design that works on mobile and desktop
- Dark/light theme support
- Error handling for API issues
- **Micro Frontend Architecture**: Can be integrated into any host application

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Using as a Micro Frontend

This widget is configured as a remote module using Module Federation. To consume it in a host application:

1. Configure your host application to use Module Federation
2. Add this widget as a remote in your host's configuration
3. Import and use the widget in your host application

Example host configuration:
```javascript
// vite.config.js in host application
federation({
  name: 'host',
  remotes: {
    weather_widget: 'http://localhost:5173/remoteEntry.js',
  },
  shared: ['vue', 'vuetify']
})
```

Example usage in host:
```javascript
// In your host component
import { defineAsyncComponent } from 'vue'

const WeatherWidget = defineAsyncComponent(() => 
  import('weather_widget/WeatherWidget')
)
```

## Environment Variables

This project uses environment variables to store sensitive information like API keys. To set up:

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the project root
3. Add your API key as shown below:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

**Note:** The `.env` file is excluded from version control for security reasons. Never commit your API keys to a public repository.

## Technologies

- Vue 3 with Composition API
- TypeScript
- Vuetify 3 (Material Design components)
- Vite
- Module Federation for Micro Frontend architecture
- Axios for API requests

## Building for Production

```bash
npm run build
```

## License

MIT
