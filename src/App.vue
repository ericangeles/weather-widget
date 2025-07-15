<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>Weather Widget</v-app-bar-title>
      <v-spacer></v-spacer>
      <ThemeSwitcher />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <CitySelector :initialCity="currentCity" @citySelected="updateCity" />
            <WeatherCard :city="currentCity" :key="currentCity" />
            
            <!-- Uncomment this when you have the forecast API endpoint working -->
            <!-- <WeatherForecast :city="currentCity" :key="'forecast-' + currentCity" /> -->
            
            <v-card class="mt-6" variant="outlined">
              <v-card-title>About This App</v-card-title>
              <v-card-text>
                <p>This weather widget displays current weather information for cities around the world using the OpenWeatherMap API.</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app color="primary" class="text-center d-flex justify-center">
      <div class="text-white">
        &copy; {{ new Date().getFullYear() }} — Weather Widget App
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WeatherCard from './components/WeatherCard.vue'
import CitySelector from './components/CitySelector.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
// import WeatherForecast from './components/WeatherForecast.vue'

const currentCity = ref('Manila')

const updateCity = (city: string) => {
  currentCity.value = city
}
</script>
