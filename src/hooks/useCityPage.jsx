import { useEffect, useDebugValue} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { getForecastUrl } from '../utils/urls'
import getChartData from '../utils/transform/getChartData'
import getForecastItemList from '../utils/transform/getForecastItemList'
import { getCityCode } from '../utils/utils'

const useCityPage = (allChartData, allForecastItemList, actions) => {
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
        // onsetChartData({ [cityCode]: dataAux} )
        actions({ type: 'SET_CHART_DATA', payload: { [cityCode]: dataAux } })

        const forecastItemListAux = getForecastItemList(data)
        // onsetForecastItemList({ [cityCode]: forecastItemListAux })
        actions({ type: 'SET_FORECAST_ITEM_LIST', payload: { [cityCode]: forecastItemListAux } })

      } catch (error) {
        console.log(error)
      }
    }

    const cityCode = getCityCode(city, countryCode)

    if (allChartData && allForecastItemList && !allChartData[cityCode] && !allForecastItemList[cityCode]) {
      getForecast()
    }
  }, [city, countryCode, allChartData, allForecastItemList, actions])
  return { city, countryCode}
}

export default useCityPage