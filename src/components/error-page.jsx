import { useRouteError } from "react-router-dom"
import { Header } from "./header"

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <>
      <Header />
      <main className="main-error">
        <section>
          <h1>Opa!</h1>
          <p>Desculpe, um erro inesperado aconteceu:</p>
          <p>{error.statusText || error.message}</p>
        </section>
      </main>
    </>
  )
}

export { ErrorPage }
