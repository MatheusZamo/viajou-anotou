import { Form, NavLink, Outlet, useLoaderData } from "react-router-dom"
import { Logo } from "./logo"
import { Map } from "./map"

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
      <Map cities={cities} />
      <Form method="post" action="/logout">
        <button className="btn-logout">Logout</button>
      </Form>
    </main>
  )
}

export { AppLayout }
