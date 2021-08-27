import { useEffect, useDebugValue} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { getForecastUrl } from '../utils/urls'
import getChartData from '../utils/transform/getChartData'
import getForecastItemList from '../utils/transform/getForecastItemList'
import { getCityCode } from '../utils/utils'

const useCityPage = (allChartData, allForecastItemList, onsetChartData, onsetForecastItemList) => {
  const { city, countryCode } = useParams()

  useDebugValue(`Hola mundo ${city}`)

  useEffect(() => {
    const getForecast = async () => {
      const url = getForecastUrl({ city, countryCode })
      const cityCode = getCityCode(city, countryCode)
      try {
        const { data } = await axios.get(url)
        console.log('url', data)
        const dataAux = getChartData(data)
        onsetChartData({ [cityCode]: dataAux} )
        const forecastItemListAux = getForecastItemList(data)
        onsetForecastItemList({ [cityCode]: forecastItemListAux })

      } catch (error) {
        console.log(error)
      }
    }

    const cityCode = getCityCode(city, countryCode)

    if (allChartData && allForecastItemList && !allChartData[cityCode] && !allForecastItemList[cityCode]) {
      getForecast()
    }
  }, [city, countryCode, onsetChartData, onsetForecastItemList, allChartData, allForecastItemList])
  return { city, countryCode}
}

export default useCityPage