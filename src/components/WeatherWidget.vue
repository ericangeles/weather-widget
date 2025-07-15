<template>
  <div class="weather-widget">
    <v-card class="mx-auto" max-width="100%" variant="outlined">
      <v-card-title class="text-center">Weather Widget</v-card-title>
      <v-card-text>
        <CitySelector :initialCity="currentCity" @citySelected="updateCity" />
        <WeatherCard :city="currentCity" :key="currentCity + '-current'" />
        <WeatherForecast :city="currentCity" :key="currentCity + '-forecast'" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import WeatherCard from './WeatherCard.vue'
import CitySelector from './CitySelector.vue'
import WeatherForecast from './WeatherForecast.vue'

const currentCity = ref('Manila')

const updateCity = (city: string) => {
  currentCity.value = city
}

// Expose methods that can be called from the host application
defineExpose({
  setCity: (city: string) => {
    currentCity.value = city
  },
  getCity: () => currentCity.value
})
</script>

<style scoped>
.weather-widget {
  font-family: 'Roboto', sans-serif;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
