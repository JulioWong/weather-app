import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import CityList from './CityList'

const cities = [
  {city: "Buenos Aires", country: "Argentina"},
  {city: "Lima", country: "Perú"},
  {city: "Madrid", country: "España"},
  {city: "Ciudad de mexico", country: "Mexico"},
]

it("City renders", async () => {
  const { findAllByRole } = render(<CityList cities={cities} onClickCity={() => {} } />)
  const items = await findAllByRole("button")
  expect(items).toHaveLength(4)
})

it("CityList click on item", async () => {
  const fnClickOnItem = jest.fn()
  const { findAllByRole } = render(<CityList cities={cities} onClickCity={fnClickOnItem} />)
  const items = await findAllByRole("button")

  fireEvent.click(items[0])
  expect(fnClickOnItem).toHaveBeenCalledTimes(1)

})