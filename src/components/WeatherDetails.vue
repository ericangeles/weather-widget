<template>
  <v-expansion-panels variant="accordion" class="mt-4">
    <v-expansion-panel>
      <v-expansion-panel-title>
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi-information-outline</v-icon>
          More Details
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="6" v-for="(detail, index) in details" :key="index">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon :icon="detail.icon" color="primary"></v-icon>
              </template>
              <v-list-item-title>{{ detail.label }}</v-list-item-title>
              <v-list-item-subtitle>{{ detail.value }}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  weatherData: {
    temp: number | null
    feels_like: number | null
    humidity: number | null
    wind_speed: number | null
    pressure: number | null
    visibility: number | null
    sunrise: number | null
    sunset: number | null
  }
}>()

const formatTime = (timestamp: number | null): string => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp * 1000).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const details = computed(() => [
  {
    label: 'Pressure',
    value: props.weatherData.pressure ? `${props.weatherData.pressure} hPa` : 'N/A',
    icon: 'mdi-gauge'
  },
  {
    label: 'Visibility',
    value: props.weatherData.visibility ? `${(props.weatherData.visibility / 1000).toFixed(1)} km` : 'N/A',
    icon: 'mdi-eye-outline'
  },
  {
    label: 'Sunrise',
    value: formatTime(props.weatherData.sunrise),
    icon: 'mdi-weather-sunset-up'
  },
  {
    label: 'Sunset',
    value: formatTime(props.weatherData.sunset),
    icon: 'mdi-weather-sunset-down'
  }
])
</script>
