import { fakeAuthProvider } from "../utils/fake-auth-provider"
import { redirect } from "react-router-dom"

const logoutAction = async () => {
  await fakeAuthProvider.signOut()
  return redirect("/")
}

export { logoutAction }
