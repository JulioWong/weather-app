import {useState, useEffect} from 'react'
import axios from 'axios'
import { getWeatherUrl } from '../utils/urls'
import getAllWeather from '../utils/transform/getAllWeather'
import { getCityCode } from '../utils/utils'

const useCityList = (cities, allWeather, actions) => {

  // const [allWeather, setAllWeather] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const setWeather = async (city, countryCode) => {
      const url = getWeatherUrl({ city, countryCode })
            
      try {
        // onsetAllWeather({ [getCityCode(city, countryCode)]: {} })
        actions({ type: 'SET_ALL_WEATHER', payload: { [getCityCode(city, countryCode)]: {} } })

        const response = await axios.get(url)
        const allWeatherAux = getAllWeather(response, city, countryCode)
        
        // onsetAllWeather(allWeatherAux)
        actions({ type: 'SET_ALL_WEATHER', payload: allWeatherAux })

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

    console.log('CITY LOG', cities)
    
    cities.forEach(({ city, countryCode }) => {
      if (!allWeather[getCityCode(city, countryCode)]) setWeather(city, countryCode)
    });

  }, [cities, allWeather, actions])
  return { error, setError }
}

export default useCityList