# API Documentation: Weather Widget Micro Frontend

This document outlines the interface between the Weather Widget micro frontend and any container application that integrates it.

## Integration API

### Importing the Weather Widget

```javascript
import { defineAsyncComponent } from 'vue'

const WeatherWidget = defineAsyncComponent(() => 
  import('weather_widget/WeatherWidget')
)
```

### Props

The Weather Widget accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| initialCity | String | 'Manila' | The initial city to display weather for |
| units | String | 'metric' | Units for temperature ('metric' for Celsius, 'imperial' for Fahrenheit) |
| apiKey | String | null | Optional API key override for OpenWeatherMap |

Example usage:
```html
<WeatherWidget 
  initialCity="Tokyo"
  units="imperial"
/>
```

### Events

The Weather Widget emits the following events:

| Event | Payload | Description |
|-------|---------|-------------|
| citySelected | String | Emitted when a user selects a new city |
| weatherLoaded | Object | Emitted when weather data is successfully loaded |
| weatherError | Object | Emitted when there's an error loading weather data |

Example usage:
```html
<WeatherWidget 
  @citySelected="handleCityChange"
  @weatherLoaded="handleWeatherData"
  @weatherError="handleError"
/>
```

```javascript
const handleCityChange = (city) => {
  console.log(`City changed to: ${city}`);
}

const handleWeatherData = (data) => {
  console.log('Weather data:', data);
}

const handleError = (error) => {
  console.error('Weather error:', error);
}
```

### Exposed Methods

The Weather Widget exposes the following methods that can be called from the container application:

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| setCity | city: String | void | Programmatically change the displayed city |
| getCity | none | String | Get the currently displayed city |
| refresh | none | Promise | Refresh the weather data for the current city |

Example usage:
```html
<WeatherWidget ref="weatherWidgetRef" />
```

```javascript
// Access using a ref
const weatherWidgetRef = ref(null);

// Change the city
const changeCity = () => {
  weatherWidgetRef.value.setCity('London');
}

// Get the current city
const getCurrentCity = () => {
  const city = weatherWidgetRef.value.getCity();
  console.log(`Current city: ${city}`);
}

// Refresh the weather data
const refreshWeather = async () => {
  await weatherWidgetRef.value.refresh();
  console.log('Weather data refreshed');
}
```

## Styling Customization

The Weather Widget provides the following CSS custom properties for styling customization:

| CSS Variable | Default | Description |
|-------------|---------|-------------|
| --weather-widget-background | #ffffff | Background color of the widget |
| --weather-widget-text-color | #333333 | Text color of the widget |
| --weather-widget-border-radius | 8px | Border radius of the widget |

Example usage:
```css
/* In the container application */
.custom-weather-widget-container {
  --weather-widget-background: #f5f5f5;
  --weather-widget-text-color: #222222;
  --weather-widget-border-radius: 12px;
}
```

## Error Handling

The Weather Widget handles errors internally and displays appropriate error messages to the user. However, container applications can also listen for the `weatherError` event to implement custom error handling.

## Versioning and Compatibility

The Weather Widget follows semantic versioning:
- MAJOR version changes indicate breaking changes to the API
- MINOR version changes indicate new features that are backward-compatible
- PATCH version changes indicate backward-compatible bug fixes

Container applications should specify the version of the Weather Widget they're compatible with.
