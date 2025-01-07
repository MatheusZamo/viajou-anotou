import {
  Route,
  Link,
  NavLink,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"

const Home = () => (
  <main className="main-home">
    <section>
      <nav className="nav">
        <img
          className="logo"
          src="logo-viajou-anotou-light.png"
          alt="Logo da viajou anotou"
        />
        <ul>
          <li>
            <NavLink to="/">Início</NavLink>
          </li>
          <li>
            <NavLink to="price">Preço</NavLink>
          </li>
          <li>
            <NavLink to="about">Sobre</NavLink>
          </li>
        </ul>
      </nav>
      <h1>
        Você viaja o mundo.
        <br /> E o ViajouAnotou mantém suas aventuras anotadas.
      </h1>
      <h2>
        Um mapa mundial que rastreia por onde você passou. Nunca esqueça suas
        experiências e mostre aos seus amigos o quê você fez pelo mundo.
      </h2>
      <Link to="about" className="cta">
        Começar Agora
      </Link>
    </section>
  </main>
)

const Price = () => <h1>Price</h1>

const About = () => <h1>About</h1>

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Home />} />
      <Route path="price" element={<Price />} />
      <Route path="about" element={<About />} />
    </Route>,
  ),
)

const App = () => <RouterProvider router={router} />

export { App }
