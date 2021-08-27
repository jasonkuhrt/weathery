#!/usr/bin/env node

const envarSpecs = {
  VISUAL_CROSSING_WEATHER_API_KEY: {
    name: `VISUAL_CROSSING_WEATHER_API_KEY`,
  },
}

if (!process.env[envarSpecs.VISUAL_CROSSING_WEATHER_API_KEY.name]) {
  console.log(
    `Missing environment variable "${envarSpecs.VISUAL_CROSSING_WEATHER_API_KEY.name}". You need to set this to the value of your Visual Crossig API key. If you do not have an API key yet then please get one at https://www.visualcrossing.com/weather/weather-data-services#/login.`
  )
  process.exit(1)
}
