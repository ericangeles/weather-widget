<template>
  <v-card class="mx-auto">
    <v-card-title class="d-flex justify-space-between align-center">
      <span>Weather in {{ city }}</span>
      <v-btn
        icon
        variant="text"
        @click="fetchWeather"
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

      <div v-else>
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="12" v-if="weatherIcon">
            <v-img
              :src="`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`"
              :alt="description"
              width="100"
              height="100"
              class="mx-auto"
            ></v-img>
          </v-col>
          
          <v-col cols="12">
            <div class="text-h2 font-weight-bold primary--text">
              {{ Math.round(temperature || 0) }}°C
            </div>
            <div class="text-subtitle-1 text-capitalize">
              {{ description }}
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <v-row>
          <v-col cols="4" class="text-center">
            <div class="text-caption text-medium-emphasis">Feels like</div>
            <div class="text-body-1">{{ Math.round(feelsLike || 0) }}°C</div>
          </v-col>
          <v-col cols="4" class="text-center">
            <div class="text-caption text-medium-emphasis">Humidity</div>
            <div class="text-body-1">{{ humidity }}%</div>
          </v-col>
          <v-col cols="4" class="text-center">
            <div class="text-caption text-medium-emphasis">Wind</div>
            <div class="text-body-1">{{ windSpeed }} m/s</div>
          </v-col>
        </v-row>

        <WeatherDetails 
          :weatherData="{
            temp: temperature,
            feels_like: feelsLike,
            humidity: humidity,
            wind_speed: windSpeed,
            pressure: pressure,
            visibility: visibility,
            sunrise: sunrise,
            sunset: sunset
          }"
        />
      </div>
    </v-card-text>

    <v-card-actions v-if="lastUpdated && !loading && !error">
      <v-spacer></v-spacer>
      <div class="text-caption text-medium-emphasis">
        Last updated: {{ formatTime(lastUpdated) }}
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import WeatherDetails from './WeatherDetails.vue'

// Props
const props = defineProps<{
  city: string
}>()

// State
const temperature = ref<number | null>(null)
const description = ref<string>('')
const weatherIcon = ref<string>('')
const humidity = ref<number | null>(null)
const windSpeed = ref<number | null>(null)
const feelsLike = ref<number | null>(null)
const pressure = ref<number | null>(null)
const visibility = ref<number | null>(null)
const sunrise = ref<number | null>(null)
const sunset = ref<number | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const lastUpdated = ref<Date | null>(null)

// Format time
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Fetch weather data
const fetchWeather = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Try to get the API key from environment variables
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || '742fd50029c30f67760df25de4f93ac4';
    
    if (!apiKey) {
      console.error('API key is missing');
      throw new Error('API key is missing. Please add VITE_OPENWEATHER_API_KEY to your .env file')
    }
    
    console.log('Fetching weather data for:', props.city)
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`
    )
    
    temperature.value = response.data.main.temp
    description.value = response.data.weather[0].description
    weatherIcon.value = response.data.weather[0].icon
    humidity.value = response.data.main.humidity
    windSpeed.value = response.data.wind.speed
    feelsLike.value = response.data.main.feels_like
    pressure.value = response.data.main.pressure
    visibility.value = response.data.visibility
    sunrise.value = response.data.sys.sunrise
    sunset.value = response.data.sys.sunset
    lastUpdated.value = new Date()
  } catch (err: any) {
    console.error('Weather API error:', err)
    error.value = err.message || 'Failed to fetch weather data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchWeather()
})
</script>
