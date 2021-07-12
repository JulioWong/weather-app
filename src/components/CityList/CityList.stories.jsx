import React from 'react'
import CityList from './CityList'
import { action } from '@storybook/addon-actions'

export default {
  title: "CityList",
  component: CityList
}

const cities = [
  {city: "Buenos Aires", country: "Argentina"},
  {city: "Lima", country: "Perú"},
  {city: "Madrid", country: "España"},
  {city: "Ciudad de mexico", country: "Mexico"},
]

export const cityListExample = () => <CityList cities={cities} onClickCity={action('Click en City')} />
