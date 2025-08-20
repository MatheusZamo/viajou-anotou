import { useLoaderData, useNavigate, Form } from "react-router-dom"

const EditCity = () => {
  const city = useLoaderData()
  const navigate = useNavigate()

  const handleClickBack = () => navigate("/app/cities")
  return (
    <Form method="post" className="form-edit-city">
      <label>
        <span>Nome da cidade</span>
        <input
          name="name"
          required
          type="text"
          key={city.name}
          defaultValue={city.name}
        />
      </label>
      <label>
        <span>Quando você foi para {city.name} ?</span>
        <input
          name="date"
          required
          type="date"
          defaultValue={city.date || ""}
        />
      </label>
      <label>
        <span>Suas anotações sobre a cidade!</span>
        <textarea
          name="notes"
          required
          defaultValue={city.notes || ""}
        ></textarea>
      </label>
      <div className="buttons">
        <button className="btn-back" type="button" onClick={handleClickBack}>
          &larr; Voltar
        </button>
        <button className="btn-save" type="submit">
          Salvar
        </button>
      </div>
    </Form>
  )
}

export { EditCity }
