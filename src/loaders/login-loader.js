import { fakeAuthProvider } from "../utils/fake-auth-provider"
import { redirect } from "react-router-dom"

const loginLoader = async () => {
  if (!fakeAuthProvider.isAuthenticated) {
    return null
  }

  return redirect("/app")
}

export { loginLoader }
