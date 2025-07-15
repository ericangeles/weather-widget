<template>
  <v-card class="mb-6" variant="outlined">
    <v-card-text>
      <v-form @submit.prevent="selectCity">
        <v-row align="center" no-gutters>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="cityInput"
              label="Enter city name"
              variant="outlined"
              density="compact"
              hide-details
              prepend-inner-icon="mdi-map-marker"
              placeholder="e.g. New York, London, Tokyo"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="pl-sm-4 mt-3 mt-sm-0">
            <v-btn 
              color="primary" 
              block 
              type="submit"
              :disabled="!cityInput.trim()"
              prepend-icon="mdi-magnify"
            >
              Get Weather
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  initialCity?: string
}>()

const emit = defineEmits<{
  (e: 'citySelected', city: string): void
}>()

const cityInput = ref(props.initialCity || '')

const selectCity = () => {
  if (cityInput.value.trim()) {
    emit('citySelected', cityInput.value.trim())
  }
}

// Expose cityInput for testing and parent component access
defineExpose({
  cityInput
})
</script>
