import localforage from "localforage"
import { fetchCity } from "../utils/fetch-city"
import { redirect } from "react-router-dom"
import { fetchCityInfo } from "../utils/fetch-city-info"

const formAction = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData())
  const cities = await localforage.getItem("travels")
  const cityDetailsRoute = `/app/cities/${params.id}`
  const cityInStorage = await fetchCity(params.id)

  if (cityInStorage) {
    const city = {
      ...cityInStorage,
      ...formData,
    }
    await localforage.setItem("travels", [
      ...cities.filter((city) => city.id !== params.id),
      city,
    ])
    return redirect(cityDetailsRoute)
  }

  const cityInfo = await fetchCityInfo(request)
  const city = { ...cityInfo, ...formData }

  await localforage.setItem("travels", cities ? [...cities, city] : [city])
  return redirect(cityDetailsRoute)
}

export { formAction }
