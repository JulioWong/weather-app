import React from 'react'
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import AppFrame from '../components/AppFrame'
import CityList from '../components/CityList'

const cities = [
  {city: "Buenos Aires", country: "Argentina"},
  {city: "Lima", country: "Perú"},
  {city: "Madrid", country: "España"},
  {city: "Ciudad de mexico", country: "Mexico"},
]

const MainPage = props => {
  const history = useHistory()
  const onclickHandler = () => {
    history.push('/city')
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
