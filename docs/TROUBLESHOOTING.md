# Troubleshooting Guide for Micro Frontend Architecture

This document provides solutions for common issues that may arise when working with the Weather Widget micro frontend and Container application.

## Module Federation Issues

### Issue: "Failed to fetch dynamically imported module"

**Symptoms:**
- Console error: "Failed to fetch dynamically imported module"
- The micro frontend doesn't load in the container application

**Possible causes:**
1. The Weather Widget application is not running
2. CORS issues
3. Incorrect remote URL in the container configuration

**Solutions:**
1. Ensure the Weather Widget is running on the expected port (default: 5173)
2. Check the browser console for CORS errors and configure CORS headers properly
3. Verify the remote URL in the container's vite.config.ts:
   ```javascript
   remotes: {
     weather_widget: 'http://localhost:5173/remoteEntry.js',
   }
   ```

### Issue: "Shared module not available"

**Symptoms:**
- Console error about shared modules
- Multiple instances of Vue or Vuetify running

**Solutions:**
1. Ensure both applications use the same versions of shared dependencies
2. Check the shared configuration in both vite.config.ts files:
   ```javascript
   shared: ['vue', 'vuetify']
   ```

## Build and Deployment Issues

### Issue: "Module not found" in production

**Symptoms:**
- Works in development but fails in production
- Error loading the remote entry file

**Solutions:**
1. Check that the production URL is correct and accessible
2. Verify that the remoteEntry.js file is being served correctly
3. Ensure CORS headers are properly configured in production

### Issue: "Invalid host/origin header"

**Symptoms:**
- CORS errors in the console
- Micro frontend fails to load

**Solutions:**
1. Add the container application's domain to the allowed origins in the micro frontend's server configuration
2. For development, you may need to disable CORS checks in your browser for testing

## Communication Issues

### Issue: Methods not available on the micro frontend

**Symptoms:**
- "TypeError: Cannot read property 'setCity' of undefined"
- Unable to call methods on the micro frontend

**Solutions:**
1. Ensure you're using `defineExpose` correctly in the micro frontend:
   ```javascript
   defineExpose({
     setCity: (city) => { /* ... */ },
     getCity: () => { /* ... */ }
   })
   ```
2. Make sure you're accessing the component through a ref after it's mounted:
   ```javascript
   onMounted(() => {
     // Access methods after the component is mounted
     weatherWidgetRef.value.setCity('Tokyo');
   })
   ```

### Issue: Events not being received by the container

**Symptoms:**
- Event handlers in the container are not triggered

**Solutions:**
1. Verify that events are being emitted correctly in the micro frontend:
   ```javascript
   emit('citySelected', city)
   ```
2. Check that event listeners are properly set up in the container:
   ```html
   <WeatherWidget @citySelected="handleCityChange" />
   ```

## Styling Issues

### Issue: Styles leaking between applications

**Symptoms:**
- Unexpected styling changes
- Styles from one application affecting another

**Solutions:**
1. Use scoped styles in Vue components:
   ```html
   <style scoped>
   /* Styles that won't leak */
   </style>
   ```
2. Use CSS modules or a CSS-in-JS solution
3. Prefix CSS classes with application-specific prefixes

## Performance Issues

### Issue: Slow loading of micro frontends

**Symptoms:**
- Noticeable delay when loading the micro frontend
- Poor performance metrics

**Solutions:**
1. Implement code splitting to reduce bundle sizes
2. Use preloading for critical micro frontends
3. Optimize shared dependencies
4. Consider server-side rendering for initial load

## Environment Variables

### Issue: API keys not available in the micro frontend

**Symptoms:**
- API calls failing due to missing API keys
- "Unauthorized" errors from external services

**Solutions:**
1. Ensure environment variables are properly set up in both applications
2. For production, set environment variables during the build process
3. Consider passing API keys from the container to the micro frontend as props

## Development Workflow

### Issue: Changes not reflecting in the container

**Symptoms:**
- Updates to the micro frontend are not visible in the container

**Solutions:**
1. Restart both development servers
2. Clear browser cache
3. Check that hot module replacement is working correctly

## Browser Compatibility

### Issue: Works in one browser but not another

**Symptoms:**
- Functionality works in Chrome but fails in Safari or Firefox

**Solutions:**
1. Check for browser-specific JavaScript features
2. Add appropriate polyfills
3. Test across multiple browsers during development
