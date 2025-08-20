import { fetchCity } from "../utils/fetch-city"
import { fetchCityInfo } from "../utils/fetch-city-info"

const cityLoader = async ({ request, params }) => {
  const cityInStorage = await fetchCity(params.id)

  if (cityInStorage) {
    return cityInStorage
  }

  return fetchCityInfo(request)
}

export { cityLoader }
