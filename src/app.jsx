import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom"

import { appLoader } from "./loaders/app-loader"
import { cityLoader } from "./loaders/city-loader"
import { loginLoader } from "./loaders/login-loader"

import { deleteAction } from "./actions/delete-action"
import { logoutAction } from "./actions/logout-action"
import { formAction } from "./actions/form-action"
import { loginAction } from "./actions/login-action"

import { Home } from "./components/home"
import { Price } from "./components/price"
import { About } from "./components/about"
import { NotFound } from "./components/not-found"
import { Login } from "./components/login"
import { AppLayout } from "./components/app-layout"
import { Cities } from "./components/cities"
import { TripDetails } from "./components/trip-details"
import { Countries } from "./components/countries"
import { EditCity } from "./components/edit-city"
import { ErrorPage } from "./components/error-page"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />} />
        <Route path="price" element={<Price />} />
        <Route path="about" element={<About />} />
        <Route
          path="login"
          element={<Login />}
          loader={loginLoader}
          action={loginAction}
        />
        <Route path="logout" action={logoutAction} />
        <Route path="app" element={<AppLayout />} loader={appLoader}>
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
      </Route>
    </Route>,
  ),
)

const App = () => <RouterProvider router={router} />

export { App }
