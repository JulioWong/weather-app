import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CityInfo from '../CityInfo'
import Weather from '../Weather'

const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
  const { city, country } = cityAndCountry
  // const { temperature, state } = weather
  return (
    <ListItem button key={city} onClick={eventOnClickCity}>
      <Grid container justify="center" alignItems="center">
        <Grid item md={9} xs={12}>
          <CityInfo city={city} country={country} />
        </Grid>
        <Grid item md={3} xs={12}>
          {
            weather ?
              <Weather temperature={weather.temperature} state={weather.state} /> : "No hay datos"
          }
        </Grid>
      </Grid>
    </ListItem>
  )
}

const CityList = ({ cities, onClickCity }) => {

  const [allWeather, setAllWeather] = useState({})

  useEffect(() => {
    const setWeather = (city, country, countryCode) => {
      const appId = '2b98aa70c814f645937d6fd974eacdd7'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appId}`
      axios.get(url).then(response => {
        const { data } = response
        const temperature = data.main.temp
        const state = 'sunny'
        const propName = `${city}-${country}`
        const propValue = { temperature, state }
        setAllWeather(allWeather => {
          const result = { ...allWeather, [propName]: propValue}
          console.log('allWeather [result]', result)
          return result
        })
      })
    }
    
    cities.forEach(({ city, country, countryCode }) => {
      setWeather(city, country, countryCode)
    });

  }, [cities])

  return (
    <List>
      {
        cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry, 
          allWeather[`${cityAndCountry.city}-${cityAndCountry.country}`]))  
      }
    </List>
  )
}

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      countryCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickCity: PropTypes.func.isRequired,
}

export default CityList
