# Setting up GitHub Pages for your Weather Widget

After pushing your code to GitHub, follow these steps to deploy your app to GitHub Pages:

## 1. Add your API key as a repository secret

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Click on "Secrets and variables" in the left sidebar
4. Click on "Actions"
5. Click on "New repository secret"
6. Set the name as `OPENWEATHER_API_KEY`
7. Set the value to your actual OpenWeatherMap API key
8. Click "Add secret"

## 2. Enable GitHub Pages

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Click on "Pages" in the left sidebar
4. Under "Build and deployment", select "GitHub Actions" as the source
5. The deployment workflow will automatically run when you push to the main branch

## 3. View your deployed app

After the workflow completes successfully, you can view your app at:
`https://YOUR_USERNAME.github.io/weather-widget/`

## 4. Troubleshooting

If you encounter any issues with the deployment:
1. Check the Actions tab in your repository to see the workflow logs
2. Make sure your API key is correctly set as a repository secret
3. Verify that your vite.config.ts has the correct base path
