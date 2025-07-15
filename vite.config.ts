import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'weather-widget',
      filename: 'remoteEntry.js',
      exposes: {
        './WeatherWidget': './src/components/WeatherWidget.vue',
      },
      shared: ['vue', 'vuetify']
    })
  ],
  base: process.env.NODE_ENV === 'production' ? '/weather-widget/' : '/',
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
