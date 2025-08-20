import {
  Form,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom"
import { CountryFlag } from "./country-flag"
import { getFormattedDate } from "../utils/get-formatted-date"

const TripDetails = () => {
  const params = useParams()
  const cities = useOutletContext()
  const city = cities.find((city) => String(city.id) === params.id)
  const navigate = useNavigate()

  const handleClickBack = () => navigate("/app/cities")

  const deleteTrip = (e) => {
    const wantToDelete = confirm(
      "Por favor, confirme que você quer deletar essa viagem.",
    )

    if (!wantToDelete) {
      e.preventDefault()
    }
  }

  return (
    <div className="city-details">
      <div className="row">
        <h5>Nome da Cidade</h5>
        <h3>
          <CountryFlag country={city.country} />
          {city.name}
        </h3>
      </div>
      <div className="row">
        <h5>Quando você foi para {city.name}</h5>
        <p>{getFormattedDate(city.date)}</p>
      </div>
      <div className="row">
        <h5>Suas Anotações</h5>
        <p>{city.notes}</p>
      </div>
      <div className="buttons">
        <button onClick={handleClickBack} className="btn-back">
          &larr; Voltar
        </button>
        <Form action="edit">
          <button className="btn-edit" type="submit">
            &there4; Editar
          </button>
        </Form>
        <Form method="post" action="delete" onSubmit={deleteTrip}>
          <button className="btn-delete" type="submit">
            &times; Deletar
          </button>
        </Form>
      </div>
    </div>
  )
}

export { TripDetails }
