import localforage from "localforage"
import { redirect } from "react-router-dom"

const deleteAction = async ({ params }) => {
  const travels = await localforage.getItem("travels")
  await localforage.setItem(
    "travels",
    travels ? travels.filter((city) => city.id !== params.id) : [],
  )
  return redirect("/app/cities")
}

export { deleteAction }
