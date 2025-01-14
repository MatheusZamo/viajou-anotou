import { useState, useEffect } from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
  useParams,
  RouterProvider,
  Route,
  NavLink,
  Link,
  Outlet,
} from "react-router-dom"

const links = [
  { path: "/", text: "Início" },
  { path: "/price", text: "Preço" },
  { path: "/about", text: "Sobre" },
  { path: "/login", text: "Login" },
]

const Logo = ({ version = "dark" }) => (
  <Link to="/">
    <img
      className="logo"
      src={`logo-viajou-anotou-${version}.png`}
      alt="Logo da viajou anotou"
    />
  </Link>
)

const Header = () => {
  const location = useLocation()
  const isNotHomepage = location.pathname !== "/"

  return (
    <nav className="nav">
      <Logo version={isNotHomepage ? "dark" : "light"} />
      <ul>
        {links.map((link) => {
          const linkShouldBeGray =
            isNotHomepage && location.pathname !== link.path
          const isLogin = link.path === "/login"

          return (
            <li key={link.text}>
              <NavLink
                to={link.path}
                style={
                  linkShouldBeGray && !isLogin
                    ? { color: "#C2C2C2" }
                    : isLogin
                    ? { color: "white" }
                    : null
                }
                className={isLogin ? "cta" : ""}
              >
                {link.text}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const Home = () => (
  <>
    <Header />
    <main className="main-home">
      <section>
        <h1>
          Você viaja o mundo.
          <br /> E o ViajouAnotou mantém suas aventuras anotadas.
        </h1>
        <h2>
          Um mapa mundial que rastreia por onde você passou. Nunca esqueça suas
          experiências e mostre aos seus amigos o quê você fez pelo mundo.
        </h2>
        <Link to="app" className="cta">
          Começar Agora
        </Link>
      </section>
    </main>
  </>
)

const Price = () => (
  <>
    <Header />
    <main className="main-pricing">
      <section>
        <div>
          <h1>
            Preço simples.
            <br /> Só R$ 47/mês.
          </h1>
          <p>
            Comece hoje mesmo a anotar suas aventuras e mostre aos seus amigos o
            quê você fez pelo mundo.
          </p>
        </div>
        <img src="preco-viajou-anotou.jpg" alt="Avenida Paulista" />
      </section>
    </main>
  </>
)

const About = () => (
  <>
    <Header />
    <main className="main-about">
      <section>
        <div>
          <h1>Sobre o ViajouAnotou.</h1>
          <p>
            O ViajouAnotou nasceu do desejo dos amigos Paulo e Roberto de
            compartilharem de forma rápida suas aventuras pelo mundo.
          </p>
          <p>
            Aos poucos, esse desejo virou realidade em forma de software entre
            amigos e familiares. Hoje, você também pode ser parte dessa
            comunidade.
          </p>
        </div>
        <img
          className="img"
          src="sobre-viajou-anotou.jpg"
          alt="Logo da viajou anotou"
        />
      </section>
    </main>
  </>
)

const NotFound = () => (
  <>
    <Header />
    <main className="main-not-found">
      <section>
        <div>
          <h1>Pagina não encontrada =/</h1>
          <p>
            Volte para a <Link patch="/">página inicial</Link>
          </p>
        </div>
      </section>
    </main>
  </>
)

const Login = () => {
  return (
    <>
      <Header />
      <main className="main-login">
        <section>
          <form className="form-login">
            <div className="row">
              <label>
                Email
                <input type="email" />
              </label>
            </div>
            <div className="row">
              <label>
                Senha
                <input type="password" />
              </label>
            </div>
            <button>Login</button>
          </form>
        </section>
      </main>
    </>
  )
}

const AppLayout = () => {
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
        <Outlet />
      </div>
      <div className="map">
        <h1>Map</h1>
      </div>
    </main>
  )
}

const Cities = ({ cities }) => {
  return cities.length === 0 ? (
    <p>Adicione uma cidade</p>
  ) : (
    <ul className="cities">
      {cities.map((city) => (
        <li key={city.id}>
          <Link to={`${city.id}`}>
            <h3>{city.name}</h3>
            <button>&times;</button>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const CityDetails = ({ cities }) => {
  const params = useParams()
  const citie = cities.find((c) => String(c.id) === params.id)
  return (
    <div className="city-details">
      <div className="row">
        <h5>Nome da Cidade</h5>
        <h3>{citie.name}</h3>
      </div>
      <div className="row">
        <h5>Suas Anotações</h5>
        <p>{citie.notes}</p>
      </div>
    </div>
  )
}

const Country = ({ cities }) => {
  return (
    <ul className="countries">
      {cities.map((citie) => {
        return <li key={citie.id}>{citie.country}</li>
      })}
    </ul>
  )
}

const App = () => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/MatheusZamo/viajou-anotou/refs/heads/main/src/fake-cities.json",
    )
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => alert(error.message))
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<Home />} />
        <Route path="price" element={<Price />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Cities cities={cities} />} />
          <Route path="cities" element={<Cities cities={cities} />} />
          <Route path=":id" element={<CityDetails cities={cities} />} />
          <Route path="country" element={<Country cities={cities} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>,
    ),
  )

  return <RouterProvider router={router} />
}

export { App }
