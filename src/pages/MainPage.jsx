import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import AppFrame from '../components/AppFrame'
import CityList from '../components/CityList'
import { getCities } from '../utils/serviceCities'

const MainPage = () => {
  console.log('ENTREEE')
  const history = useHistory()
  const onclickHandler = useCallback((city, countryCode) => {
    history.push(`/city/${countryCode}/${city}`)
  }, [history])

  return (
    <AppFrame>
      <Paper elevation={3}>
        <CityList cities={getCities()} onClickCity={onclickHandler} />
      </Paper>
    </AppFrame>
  )
}

export default MainPage
