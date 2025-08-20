import { fakeAuthProvider } from "../utils/fake-auth-provider"
import { redirect } from "react-router-dom"

const loginAction = async ({ request }) => {
  const { email } = Object.fromEntries(await request.formData())

  if (email.length <= 3) {
    return { error: "O email não pode ter menos de 4 caracteres" }
  }

  try {
    await fakeAuthProvider.signIn(email)
  } catch (error) {
    return { error: "Não foi possível fazer login. Por favor, tente novamente" }
  }
  return redirect("/app")
}

export { loginAction }
