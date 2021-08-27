import React, { useState, useCallback, useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import MainPage from './pages/MainPage'
import CityPage from './pages/CityPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  const [allWeather, setAllWeather] = useState({})
  const [allChartData, setAllChartData] = useState({})
  const [allForecastItemList, setAllForecastItemList] = useState({})

  const onsetAllWeather = useCallback((weatherCity) => {
    setAllWeather(allWeather => ({...allWeather, ...weatherCity}))
  }, [setAllWeather])
  
  const onsetChartData = useCallback((charDataCity) => {
    setAllChartData(allChartData => ({ ...allChartData, ...charDataCity }))
  }, [setAllChartData])

  const onsetForecastItemList = useCallback((forecastItemListCity) => {
    setAllForecastItemList(allForecastItemList => ({ ...allForecastItemList, ...forecastItemListCity }))
  }, [setAllForecastItemList])

  const actions = useMemo(() => (
    {
      onsetAllWeather,
      onsetChartData, 
      onsetForecastItemList
    }
  ), [onsetAllWeather, onsetChartData, onsetForecastItemList])

  const data = useMemo(() => (
    {
      allWeather,
      allChartData,
      allForecastItemList
    }
  ), [allWeather, allChartData, allForecastItemList])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <Route path="/main">
          <MainPage actions={actions} data={data}/>
        </Route>
        <Route path="/city/:countryCode/:city">
          <CityPage actions={actions} data={data}/>
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>  
  )
}

export default App