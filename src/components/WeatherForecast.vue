<template>
  <v-card class="mt-6">
    <v-card-title class="d-flex justify-space-between align-center">
      <span>5-Day Forecast</span>
      <v-btn
        icon
        variant="text"
        @click="fetchForecast"
        :loading="loading"
        :disabled="loading"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-container v-if="loading">
        <v-row justify="center">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          ></v-progress-circular>
        </v-row>
      </v-container>

      <v-alert
        v-else-if="error"
        type="error"
        variant="tonal"
        closable
      >
        <div>
          {{ 
            error.includes('API key is missing') ? 'API key is missing' :
            error.includes('401') ? 'Authentication error: Invalid API key' : 
            error 
          }}
        </div>
        <div class="text-caption mt-2" v-if="error.includes('API key is missing')">
          Please add VITE_OPENWEATHER_API_KEY to your .env file
        </div>
        <div class="text-caption mt-2" v-if="error.includes('401')">
          Check that your OpenWeatherMap API key in the .env file is valid
        </div>
      </v-alert>

      <v-row v-else>
        <v-col
          v-for="(day, index) in forecast"
          :key="index"
          cols="6"
          sm="4"
          md="2.4"
          class="text-center"
        >
          <div class="text-subtitle-2 font-weight-medium">{{ formatDay(day.dt) }}</div>
          <v-img
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`"
            :alt="day.weather[0].description"
            width="50"
            height="50"
            class="mx-auto"
          ></v-img>
          <div class="d-flex justify-center gap-2">
            <span class="font-weight-medium">{{ Math.round(day.temp.max) }}°</span>
            <span class="text-medium-emphasis">{{ Math.round(day.temp.min) }}°</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Props
const props = defineProps<{
  city: string
}>()

// Types
interface ForecastDay {
  dt: number
  temp: {
    min: number
    max: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
}

// State
const forecast = ref<ForecastDay[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Process forecast data to get daily forecasts
const processForecastData = (forecastList: any[]): ForecastDay[] => {
  const dailyForecasts: { [key: string]: ForecastDay } = {}
  
  forecastList.forEach(item => {
    // Get date without time
    const date = new Date(item.dt * 1000)
    const dateKey = date.toISOString().split('T')[0]
    
    // Skip if it's today
    const today = new Date()
    if (date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear()) {
      return
    }
    
    // Initialize if first entry for this day
    if (!dailyForecasts[dateKey]) {
      dailyForecasts[dateKey] = {
        dt: item.dt,
        temp: {
          min: item.main.temp_min,
          max: item.main.temp_max
        },
        weather: [item.weather[0]]
      }
    } else {
      // Update min/max temps
      if (item.main.temp_min < dailyForecasts[dateKey].temp.min) {
        dailyForecasts[dateKey].temp.min = item.main.temp_min
      }
      if (item.main.temp_max > dailyForecasts[dateKey].temp.max) {
        dailyForecasts[dateKey].temp.max = item.main.temp_max
      }
      
      // Use noon weather icon if available (for better representation)
      const itemHour = date.getHours()
      if (itemHour >= 11 && itemHour <= 13) {
        dailyForecasts[dateKey].weather[0] = item.weather[0]
      }
    }
  })
  
  // Convert to array and sort by date
  return Object.values(dailyForecasts).sort((a, b) => a.dt - b.dt)
}

// Format date to day name
const formatDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
}

// Fetch forecast data
const fetchForecast = async () => {
  loading.value = true
  error.value = null
  
  try {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || '742fd50029c30f67760df25de4f93ac4';
    
    if (!apiKey) {
      throw new Error('API key is missing. Please add VITE_OPENWEATHER_API_KEY to your .env file')
    }
    
    console.log('Fetching forecast data for:', props.city)
    
    // First get coordinates from city name
    const geoResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${props.city}&limit=1&appid=${apiKey}`
    )
    
    if (!geoResponse.data.length) {
      throw new Error('City not found')
    }
    
    const { lat, lon } = geoResponse.data[0]
    console.log(`Got coordinates for ${props.city}: lat=${lat}, lon=${lon}`)
    
    // Use the free 5-day forecast API instead of One Call API
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
    
    console.log('Forecast API response received:', forecastResponse.data.list.length, 'entries')
    
    // Process the 5-day forecast data (which comes in 3-hour intervals)
    const dailyData = processForecastData(forecastResponse.data.list)
    forecast.value = dailyData.slice(0, 5)
    console.log('Processed forecast data:', forecast.value)
  } catch (err: any) {
    console.error('Forecast API error:', err)
    if (err.response) {
      console.error('API response error:', err.response.status, err.response.data)
      if (err.response.status === 401) {
        error.value = 'Authentication error (401): Invalid API key'
      } else {
        error.value = `API error (${err.response.status}): ${err.response.data.message || 'Unknown error'}`
      }
    } else if (err.request) {
      console.error('No response received:', err.request)
      error.value = 'Network error: No response from weather service'
    } else {
      error.value = err.message || 'Failed to fetch forecast data'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchForecast()
})
</script>
