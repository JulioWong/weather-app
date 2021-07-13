import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import ForeCastItem from './../ForeCastItem'
import { validValues } from '../IconState'

const renderForecastItem = forecast => {
  const { weekDay, hour, state, temperature } = forecast
  return (
    <Grid data-testid="forecast-item-container" item key={`${weekDay}${hour}`}>
      <ForeCastItem 
        hour={hour} 
        weekDay={weekDay} 
        state={state} 
        temperature={temperature}>
      </ForeCastItem>
    </Grid>
  )
}

const ForeCast = ({ forecastItemList }) => {
  return (
    <Grid container justify="space-around" alignItems="center">
      {
        forecastItemList.map(forecast => renderForecastItem(forecast))
      }
    </Grid>
  )
}

ForeCast.propTypes = {
  forecastItemList: PropTypes.arrayOf(PropTypes.shape({
    weekDay: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
    state: PropTypes.oneOf(validValues).isRequired,
    temperature: PropTypes.number.isRequired,
  }).isRequired,),
}

export default ForeCast
