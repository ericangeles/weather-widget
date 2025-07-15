import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherCard from '../WeatherCard.vue'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('WeatherCard', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('displays loading state initially', () => {
    const wrapper = mount(WeatherCard, {
      props: {
        city: 'Test City'
      }
    })
    
    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.text()).toContain('Weather in Test City')
  })

  it('displays weather data when API call succeeds', async () => {
    // Mock successful API response
    const mockResponse = {
      data: {
        main: {
          temp: 25.5,
          feels_like: 26.2,
          humidity: 65
        },
        weather: [
          {
            description: 'clear sky',
            icon: '01d'
          }
        ],
        wind: {
          speed: 3.5
        }
      }
    }
    
    // @ts-ignore
    axios.get.mockResolvedValue(mockResponse)
    
    const wrapper = mount(WeatherCard, {
      props: {
        city: 'Test City'
      }
    })
    
    // Wait for API call to resolve
    await vi.runAllTimers()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.temp').text()).toContain('25.5°C')
    expect(wrapper.find('.description').text()).toContain('clear sky')
  })

  it('displays error message when API call fails', async () => {
    // Mock API error
    const errorMessage = 'Request failed with status code 401'
    // @ts-ignore
    axios.get.mockRejectedValue(new Error(errorMessage))
    
    const wrapper = mount(WeatherCard, {
      props: {
        city: 'Test City'
      }
    })
    
    // Wait for API call to resolve
    await vi.runAllTimers()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.text()).toContain('Authentication error')
  })
})
