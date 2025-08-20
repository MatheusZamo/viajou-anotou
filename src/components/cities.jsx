import { Link, useOutletContext } from "react-router-dom"
import { CountryFlag } from "./country-flag"
import { getFormattedDate } from "../utils/get-formatted-date"

const Cities = () => {
  const cities = useOutletContext()

  return cities.length === 0 ? (
    <p className="initial-message">Clique no mapa para adicionar uma cidade</p>
  ) : (
    <ul className="cities">
      {cities.map(({ id, position, name, country, date }) => (
        <li key={id}>
          <Link
            to={`${id}?latitude=${position.latitude}&longitude=${position.longitude}`}
          >
            <CountryFlag country={country} />
            <h3>{name}</h3>
            <h4>{getFormattedDate(date)}</h4>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export { Cities }
