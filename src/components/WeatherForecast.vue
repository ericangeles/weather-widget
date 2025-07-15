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
        {{ error }}
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
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
    
    if (!apiKey) {
      throw new Error('API key is missing')
    }
    
    // First get coordinates from city name
    const geoResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${props.city}&limit=1&appid=${apiKey}`
    )
    
    if (!geoResponse.data.length) {
      throw new Error('City not found')
    }
    
    const { lat, lon } = geoResponse.data[0]
    
    // Then get forecast data using One Call API
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`
    )
    
    forecast.value = forecastResponse.data.daily.slice(0, 5)
  } catch (err: any) {
    console.error('Forecast API error:', err)
    error.value = err.message || 'Failed to fetch forecast data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchForecast()
})
</script>
