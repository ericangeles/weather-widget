#!/bin/bash

# Check if .env file exists
if [ -f .env ]; then
  echo "An .env file already exists."
  read -p "Do you want to overwrite it? (y/n): " overwrite
  if [ "$overwrite" != "y" ]; then
    echo "Exiting without changes."
    exit 0
  fi
fi

# Prompt for API key
read -p "Enter your OpenWeatherMap API key: " api_key

# Create .env file
echo "VITE_OPENWEATHER_API_KEY=$api_key" > .env
echo ".env file created with your API key."

# Verify the file was created
if [ -f .env ]; then
  echo "Setup complete! You can now run the application."
else
  echo "Error: Failed to create .env file."
  exit 1
fi
