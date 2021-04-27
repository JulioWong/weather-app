/* eslint-disable no-unused-vars */
import react from 'react'
import { render } from '@testing-library/react'
import CityInfo from './CityInfo' // SUT: Subject under testing (objeto del evento)

it("CityInfo render", async () => {
  const city = "Lima"
  const country = "Peru" 
  const { findAllByRole } = render(<CityInfo city={city} country={country} />)
  const cityAndCountryComponents = await findAllByRole('heading')
  expect(cityAndCountryComponents[0]).toHaveTextContent(city)
  expect(cityAndCountryComponents[1]).toHaveTextContent(country)
})
