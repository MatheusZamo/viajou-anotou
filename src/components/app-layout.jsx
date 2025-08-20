import { Form, NavLink, Outlet, useLoaderData } from "react-router-dom"
import { Logo } from "./logo"
import { lazy, Suspense } from "react"

const Map = lazy(() => import("./map"))

const AppLayout = () => {
  const cities = useLoaderData()

  return (
    <main className="main-app-layout">
      <div className="sidebar">
        <header>
          <Logo />
        </header>
        <nav className="nav-app-layout">
          <ul>
            <li>
              <NavLink to="cities">Cidades</NavLink>
            </li>
            <li>
              <NavLink to="country">Países</NavLink>
            </li>
          </ul>
        </nav>
        <Outlet context={cities} />
      </div>
      <Suspense fallback={<h3>Carregando...</h3>}>
        <Map cities={cities} />
      </Suspense>

      <Form method="post" action="/logout">
        <button className="btn-logout">Logout</button>
      </Form>
    </main>
  )
}

export { AppLayout }
