import { fakeAuthProvider } from "../utils/fake-auth-provider"
import { redirect } from "react-router-dom"
import localforage from "localforage"

const appLoader = async () => {
  if (!fakeAuthProvider.isAuthenticated) {
    return redirect("/login")
  }

  const data = await localforage.getItem("travels")
  return data ?? []
}

export { appLoader }
