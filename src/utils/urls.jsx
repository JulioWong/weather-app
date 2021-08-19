const appId = '2b98aa70c814f645937d6fd974eacdd7'
export const getWeatherUrl = ({ city, countryCode }) => `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appId}`
export const getForecastUrl = ({ city, countryCode }) => `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${appId}`