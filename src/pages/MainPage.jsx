import React from 'react'
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import AppFrame from '../components/AppFrame'
import CityList from '../components/CityList'

const cities = [
  {city: "Buenos Aires", country: "Argentina", countryCode: 'AR'},
  {city: "Lima", country: "Perú", countryCode: 'PE'},
  {city: "Madrid", country: "España", countryCode: 'ES'},
  {city: "Ciudad de mexico", country: "Mexico", countryCode: 'MX'},
]

const MainPage = props => {
  const history = useHistory()
  const onclickHandler = (city, countryCode) => {
    history.push(`/city/${countryCode}/${city}`)
  }
  return (
    <AppFrame>
      <Paper elevation={3}>
        <CityList cities={cities} onClickCity={onclickHandler} />
      </Paper>
    </AppFrame>
  )
}

export default MainPage
