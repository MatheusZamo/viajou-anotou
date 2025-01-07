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

const Price = () => (
  <main className="main-pricing">
    <nav className="nav">
      <img
        className="logo"
        src="logo-viajou-anotou-dark.png"
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
      <img className="img" src="preco-viajou-anotou.jpg" alt="" />
    </section>
  </main>
)

const About = () => (
  <main className="main-about">
    <nav className="nav">
      <img
        className="logo"
        src="logo-viajou-anotou-dark.png"
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
      <img className="img" src="sobre-viajou-anotou.jpg" alt="" />
    </section>
  </main>
)

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
