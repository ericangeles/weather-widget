import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue(),
      federation({
        name: 'weather-widget',
        filename: 'remoteEntry.js',
        exposes: {
          './WeatherWidget': './src/components/WeatherWidget.vue',
        },
        shared: ['vue', 'vuetify']
      }),
      // Add Node.js polyfills
      nodePolyfills({
        // Whether to polyfill specific Node.js globals
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        // Whether to polyfill Node.js builtins
        protocolImports: true,
      }),
    ],
    base: process.env.NODE_ENV === 'production' ? '/weather-widget/' : '/',
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
    // Ensure environment variables are properly exposed
    define: {
      'import.meta.env.VITE_OPENWEATHER_API_KEY': JSON.stringify(env.VITE_OPENWEATHER_API_KEY || '')
    }
  }
})
