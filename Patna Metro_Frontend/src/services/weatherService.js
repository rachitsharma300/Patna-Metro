export const fetchPatnaWeather = async () => {
  try {
    // Patna Coordinates: 25.5941° N, 85.1376° E
    const weatherRes = await fetch("https://api.open-meteo.com/v1/forecast?latitude=25.5941&longitude=85.1376&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FKolkata");
    const aqiRes = await fetch("https://air-quality-api.open-meteo.com/v1/air-quality?latitude=25.5941&longitude=85.1376&current=european_aqi,us_aqi,pm10,pm2_5&timezone=Asia%2FKolkata");

    if (!weatherRes.ok || !aqiRes.ok) throw new Error("Failed to fetch weather data");

    const weatherData = await weatherRes.json();
    const aqiData = await aqiRes.json();

    return {
      success: true,
      weather: weatherData.current,
      aqi: aqiData.current
    };
  } catch (error) {
    console.error("Error fetching Patna weather:", error);
    return { success: false, error: error.message };
  }
};
