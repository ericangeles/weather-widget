<template>
  <v-btn
    icon
    variant="text"
    @click="toggleTheme"
    :title="isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'"
  >
    <v-icon>{{ isDarkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDarkTheme = ref(false)

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  theme.global.name.value = isDarkTheme.value ? 'dark' : 'light'
  localStorage.setItem('darkTheme', isDarkTheme.value.toString())
}

onMounted(() => {
  const savedTheme = localStorage.getItem('darkTheme')
  if (savedTheme) {
    isDarkTheme.value = savedTheme === 'true'
    theme.global.name.value = isDarkTheme.value ? 'dark' : 'light'
  } else {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDarkTheme.value = prefersDark
    theme.global.name.value = prefersDark ? 'dark' : 'light'
  }
})
</script>
