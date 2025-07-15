# Deployment Guide for Micro Frontend Architecture

This document outlines the deployment process for both the Weather Widget micro frontend and the Container application.

## Deployment Strategies

### Independent Deployment

Each micro frontend should be deployed independently to enable:
- Separate release cycles
- Independent versioning
- Isolated rollbacks

### Production Deployment Steps

#### 1. Weather Widget Micro Frontend

1. **Build the application**:
   ```bash
   cd weather-widget
   npm run build
   ```

2. **Deploy to a static hosting service** (AWS S3, Netlify, Vercel, etc.):
   ```bash
   # Example for AWS S3
   aws s3 sync dist/ s3://your-bucket-name/weather-widget/
   ```

3. **Configure CORS headers** to allow the container application to load the micro frontend:
   ```
   Access-Control-Allow-Origin: https://your-container-domain.com
   Access-Control-Allow-Methods: GET
   Access-Control-Allow-Headers: Content-Type
   ```

4. **Set up a CDN** (like CloudFront) for better performance and caching.

#### 2. Container Application

1. **Update the remote URL** in the container's vite.config.ts to point to the production URL:
   ```javascript
   federation({
     name: 'container',
     remotes: {
       weather_widget: 'https://your-production-url.com/weather-widget/remoteEntry.js',
     },
     // ...
   })
   ```

2. **Build the application**:
   ```bash
   cd weather-container
   npm run build
   ```

3. **Deploy to a static hosting service**:
   ```bash
   # Example for AWS S3
   aws s3 sync dist/ s3://your-bucket-name/container/
   ```

## Versioning Strategy

To manage updates and ensure compatibility:

1. **Semantic Versioning**: Use semantic versioning for your micro frontends
   ```
   MAJOR.MINOR.PATCH
   ```

2. **Version in URL**: Consider including the version in the URL:
   ```javascript
   remotes: {
     weather_widget: 'https://your-production-url.com/weather-widget/v1.2.3/remoteEntry.js',
   }
   ```

3. **Gradual Rollout**: Use techniques like canary deployments to gradually roll out updates.

## CI/CD Pipeline

Set up separate CI/CD pipelines for each application:

1. **Weather Widget Pipeline**:
   - Trigger on changes to the weather-widget directory
   - Run tests
   - Build the application
   - Deploy to staging/production

2. **Container Application Pipeline**:
   - Trigger on changes to the container directory
   - Run tests
   - Build the application
   - Deploy to staging/production

## Monitoring and Rollbacks

1. **Health Checks**: Implement health checks for each micro frontend
2. **Error Tracking**: Use services like Sentry to track runtime errors
3. **Rollback Procedure**: Document the process for rolling back to previous versions

## Performance Considerations

1. **Caching Strategy**: Set appropriate cache headers for the remoteEntry.js file
2. **Preloading**: Consider preloading micro frontends that are likely to be used
3. **Lazy Loading**: Only load micro frontends when they're needed
