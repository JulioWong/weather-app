import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import convertUnits from 'convert-units'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CityInfo from '../CityInfo'
import Weather from '../Weather'

const getCityCode = (city, countryCode) => `${city}-${countryCode}`

const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
  const { city, country, countryCode } = cityAndCountry

  return (
    <ListItem button key={getCityCode(city, countryCode)} onClick={eventOnClickCity}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item md={9} xs={12}>
          <CityInfo city={city} country={country} />
        </Grid>
        <Grid item md={3} xs={12}>
          <Weather 
          temperature={weather && weather.temperature} 
          state={weather && weather.state} />
        </Grid>
      </Grid>
    </ListItem>
  )
}

const CityList = ({ cities, onClickCity }) => {

  const [allWeather, setAllWeather] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const setWeather = async (city, countryCode) => {
      const appId = '2b98aa70c814f645937d6fd974eacdd7'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appId}`
            
      try {
        const response = await axios.get(url)
        const { data } = response
        const temperature = convertUnits(data.main.temp).from("K").to("C").toFixed(0)
        const state = data.weather[0].main.toLowerCase()
        const propName = getCityCode(city, countryCode)
        const propValue = { temperature, state }
        setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue}))

      } catch (e) {
        if (e.response) {
          setError("Ha ocurrido un error con el servidor del clima")

        } else if(e.request) {
          setError("Verifique la conexión a internet")

        } else {
          setError("Error al cargar los datos")
        }
      }
    }
    
    cities.forEach(({ city, countryCode }) => {
      setWeather(city, countryCode)
    });

  }, [cities])

  return (
    <div>
      {
        error && <Alert severity="error" onClose={() => { setError(null) }}>{error}</Alert> 
      }
      <List>
        {
          cities.map(cityAndCountry => 
            renderCityAndCountry(onClickCity)
            (cityAndCountry, allWeather[getCityCode(cityAndCountry.city, cityAndCountry.countryCode)])
          )  
        }
      </List>
    </div> 
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
