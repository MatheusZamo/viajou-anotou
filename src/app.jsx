import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
  useLoaderData,
  useOutletContext,
  RouterProvider,
  Route,
  NavLink,
  Link,
  Outlet,
  Navigate,
  Form,
} from "react-router-dom"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet"
import localforage from "localforage"

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

const ChangeCenter = ({ position }) => {
  const map = useMap()
  map.setView(position)
  return null
}

const ChangeToClickedCity = () => {
  const navigate = useNavigate()
  const id = crypto.randomUUID()
  useMapEvents({
    click: (e) =>
      navigate(
        `cities/${id}/edit?latitude=${e.latlng.lat}&longitude=${e.latlng.lng}`,
      ),
  })
}

const beloHorizontePosition = {
  latitude: "-19.917622853492556",
  longitude: "-43.94031082020503",
}

const getDataCities = async () => {
  const data = await localforage.getItem("travels")
  return data ?? []
}

const deleteAction = async ({ params }) => {
  const travels = await localforage.getItem("travels")
  await localforage.setItem(
    "travels",
    travels ? travels.filter((city) => city.id !== params.id) : [],
  )
  return redirect("/app/cities")
}

const AppLayout = () => {
  const [searchParams] = useSearchParams()
  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")
  const travels = useLoaderData()

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
        <Outlet context={travels} />
      </div>
      <div className="map">
        <MapContainer
          center={[
            beloHorizontePosition.latitude,
            beloHorizontePosition.longitude,
          ]}
          zoom={11}
          scrollWheelZoom={true}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {travels.map(({ id, position }) => (
            <Marker key={id} position={[position.latitude, position.longitude]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          ))}

          {latitude && longitude && (
            <ChangeCenter position={[latitude, longitude]} />
          )}
          <ChangeToClickedCity />
        </MapContainer>
      </div>
    </main>
  )
}

const Cities = () => {
  const cities = useOutletContext()

  return cities.length === 0 ? (
    <p className="initial-message">Clique no mapa para adicionar uma cidade</p>
  ) : (
    <ul className="cities">
      {cities.map(({ id, position, name }) => (
        <li key={id}>
          <Link
            to={`${id}?latitude=${position.latitude}&longitude=${position.longitude}`}
          >
            <h3>{name}</h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}

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
        <h3>{city.name}</h3>
      </div>
      <div>
        <h5>Quando você foi para {city.name}</h5>
        <p>{city.date}</p>
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

const Countries = () => {
  const cities = useOutletContext()
  const groupedByCountry = Object.groupBy(cities, ({ country }) => country)
  const countries = Object.keys(groupedByCountry)
  return (
    <ul className="countries">
      {countries.map((country) => {
        return <li key={country.id}>{country}</li>
      })}
    </ul>
  )
}

const cityLoader = async ({ request, params }) => {
  const cityInStorage = await localforage
    .getItem("travels")
    .then((cities) => cities?.find((city) => city.id === params.id))

  if (cityInStorage) {
    return cityInStorage
  }

  const url = new URL(request.url)
  const [latitude, longitude] = ["latitude", "longitude"].map((item) =>
    url.searchParams.get(item),
  )
  const response = await fetch(
    `https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-BR`,
  )
  const info = await response.json()
  return { name: info.city, id: params.id }
}

const formAction = async ({ request, params }) => {
  const formData = await request.formData()
  const cities = await localforage.getItem("travels")
  const cityInStorage = await localforage
    .getItem("travels")
    .then((cities) => cities?.find((city) => city.id === params.id))

  if (cityInStorage) {
    const city = {
      ...Object.fromEntries(formData),
      position: cityInStorage.position,
      id: cityInStorage.id,
      country: cityInStorage.country,
    }
    await localforage.setItem("travels", [
      ...cities.filter((city) => city.id !== params.id),
      city,
    ])
    return redirect(`/app/cities/${params.id}`)
  }

  const url = new URL(request.url)
  const [latitude, longitude] = ["latitude", "longitude"].map((item) =>
    url.searchParams.get(item),
  )
  const response = await fetch(
    `https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-BR`,
  )
  const info = await response.json()
  const city = {
    ...Object.fromEntries(formData),
    position: { latitude, longitude },
    id: params.id,
    country: info.countryName,
  }
  await localforage.setItem("travels", cities ? [...cities, city] : [city])
  return redirect(`/app/cities/${params.id}`)
}

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Home />} />
      <Route path="price" element={<Price />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />} loader={getDataCities}>
        <Route index element={<Navigate replace to="cities" />} />
        <Route path="cities" element={<Cities />} />
        <Route path="cities/:id" element={<TripDetails />} />
        <Route
          path="cities/:id/edit"
          element={<EditCity />}
          loader={cityLoader}
          action={formAction}
        />
        <Route path="cities/:id/delete" action={deleteAction} />
        <Route path="country" element={<Countries />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

const App = () => <RouterProvider router={router} />

export { App }
