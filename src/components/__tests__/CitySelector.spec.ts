import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CitySelector from '../CitySelector.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create a Vuetify instance for testing
const vuetify = createVuetify({
  components,
  directives,
})

// Global components setup
const global = {
  plugins: [vuetify],
}

describe('CitySelector', () => {
  it('renders with initial city', () => {
    const wrapper = mount(CitySelector, {
      props: {
        initialCity: 'Tokyo'
      },
      global
    })
    
    expect(wrapper.vm.cityInput).toBe('Tokyo')
  })

  it('emits citySelected event when form is submitted', async () => {
    const wrapper = mount(CitySelector, {
      props: {
        initialCity: 'Tokyo'
      },
      global
    })
    
    // Change the input value
    await wrapper.find('input').setValue('London')
    
    // Submit the form
    await wrapper.find('form').trigger('submit.prevent')
    
    // Check if the event was emitted with the correct value
    expect(wrapper.emitted('citySelected')).toBeTruthy()
    expect(wrapper.emitted('citySelected')?.[0]).toEqual(['London'])
  })

  it('does not emit event when input is empty', async () => {
    const wrapper = mount(CitySelector, {
      props: {
        initialCity: 'Tokyo'
      },
      global
    })
    
    // Clear the input
    await wrapper.find('input').setValue('')
    
    // Submit the form
    await wrapper.find('form').trigger('submit.prevent')
    
    // Check that no event was emitted
    expect(wrapper.emitted('citySelected')).toBeFalsy()
  })
})
