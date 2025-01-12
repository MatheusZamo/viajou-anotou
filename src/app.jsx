import {
  Route,
  Link,
  NavLink,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useLocation,
  Outlet,
} from "react-router-dom"

const links = [
  { path: "/", text: "Início" },
  { path: "/price", text: "Preço" },
  { path: "/about", text: "Sobre" },
]

const Header = () => {
  const location = useLocation()
  const isNotHomepage = location.pathname !== "/"

  return (
    <nav className="nav">
      <Link to="/">
        <img
          className="logo"
          src={`logo-viajou-anotou-${isNotHomepage ? "dark" : "light"}.png`}
          alt="Logo da viajou anotou"
        />
      </Link>

      <ul>
        {links.map((link) => {
          const linkShouldBeGray =
            isNotHomepage && location.pathname !== link.path
          return (
            <li key={link.text}>
              <NavLink
                to={link.path}
                style={linkShouldBeGray ? { color: "#C2C2C2" } : null}
              >
                {link.text}
              </NavLink>
            </li>
          )
        })}
        <Link to="/login" className="cta">
          Login
        </Link>
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
    <main className="main-login">
      <Header />
      <form className="form-login">
        <label>
          Email
          <input type="email" />
        </label>
        <label>
          Senha
          <input type="password" />
        </label>
        <button>Login</button>
      </form>
    </main>
  )
}

const AppLayout = () => {
  return (
    <main className="main-app-layout">
      <sidebar className="sidebar">
        <Link to="/">
          <img
            className="logo"
            src="logo-viajou-anotou-dark.png"
            alt="Logo da viajou anotou"
          />
        </Link>
        <nav className="nav-app-layout">
          <ul>
            <li>
              <NavLink to="cities">Cidades</NavLink>
            </li>
            <li>
              <NavLink to="country">Países</NavLink>
            </li>
          </ul>

          <Outlet />
        </nav>
      </sidebar>
      <div className="map">
        <h1>Map</h1>
      </div>
    </main>
  )
}

const Cities = () => {
  return <h1>Cities</h1>
}

const Country = () => {
  return <h1>Country</h1>
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Home />} />
      <Route path="price" element={<Price />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />}>
        <Route path="cities" element={<Cities />} />
        <Route path="country" element={<Country />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

const App = () => <RouterProvider router={router} />

export { App }
