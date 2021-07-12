import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import ForeCastItem from './../ForeCastItem'

const renderForecastItem = forecast => {
  const { weekDay, hour, state, temperature } = forecast
  return (
    <Grid item key={`${weekDay}${hour}`}>
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
    <Grid container justify="center" alignItems="center">
      {
        forecastItemList.map(forecast => )
      }
    </Grid>
  )
}

ForeCast.propTypes = {

}

export default ForeCast
