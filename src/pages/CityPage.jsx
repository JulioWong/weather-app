import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import { LinearProgress } from '@material-ui/core'
import AppFrame from '../components/AppFrame'
import CityInfo from './../components/CityInfo'
import Weather from './../components/Weather'
import WeatherDetails from './../components/WeatherDetails'
import ForecastChart from './../components/ForecastChart'
import ForeCast from './../components/ForeCast'
import useCityPage from '../hooks/useCityPage'
import useCityList from '../hooks/useCityList'
import { getCityCode } from '../utils/utils'
import { getCountryNameByCountryCode } from '../utils/serviceCities'

const CityPage = ({ actions, data }) => {
  // const { onsetAllWeather, onsetChartData, onsetForecastItemList } = actions
  const { allWeather, allChartData, allForecastItemList } = data

  const { city, countryCode } = useCityPage(allChartData, allForecastItemList, actions)
  const cities = useMemo(() => [{ city, countryCode }], [city, countryCode])

  useCityList(cities, allWeather, actions)

  const weather = allWeather[getCityCode(city, countryCode)]
  const chartData = allChartData[getCityCode(city, countryCode)]
  const forecastItemList = allForecastItemList[getCityCode(city, countryCode)]

  const country = countryCode && getCountryNameByCountryCode(countryCode)
  const humidity =  weather && weather.humidity
  const wind =  weather && weather.wind
  const state = weather && weather.state
  const temperature = weather && weather.temperature
  
  return (
    <AppFrame>
      <Grid container justifyContent="center" direction="column" spacing={2}>
      <Grid item container xs={12} justifyContent="center" alignItems="flex-end">
        <CityInfo city={city} country={country} />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Weather state={state} temperature={temperature} />
        {
          humidity && wind && <WeatherDetails humidity={humidity} wind={wind} />
        }
      </Grid>
      <Grid item>
        {
          !chartData && !forecastItemList && <LinearProgress />
        }
      </Grid>
      <Grid item>
        {
          chartData && <ForecastChart data={chartData} />
        }
      </Grid>
      <Grid item>
        {
          forecastItemList && <ForeCast forecastItemList={forecastItemList} />
        }
      </Grid>
    </Grid>
    </AppFrame>
  )
}

export default CityPage
