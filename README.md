# Weather Widget App

A modern weather widget built with Vue 3, TypeScript, Vuetify, and Vite that displays current weather information for any city.

## Features

- Display current weather conditions with icons
- Search for weather by city name
- Show detailed weather information (temperature, humidity, wind speed, etc.)
- Responsive design that works on mobile and desktop
- Dark/light theme support
- Error handling for API issues

## Screenshots

(Add screenshots of your app here)

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
- Axios for API requests

## Testing

Run the tests with:

```bash
npm run test
```

Or run tests in watch mode:

```bash
npm run test:watch
```

## Building for Production

```bash
npm run build
```

## License

MIT
