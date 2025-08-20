import { NavLink, useLocation } from "react-router-dom"
import { Logo } from "./logo"

const links = [
  { path: "/", text: "Início" },
  { path: "/price", text: "Preço" },
  { path: "/about", text: "Sobre" },
  { path: "/login", text: "Login" },
]

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

export { Header }
