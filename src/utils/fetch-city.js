import localforage from "localforage"

const fetchCity = (id) =>
  localforage
    .getItem("travels")
    .then((travels) => travels?.find((travel) => travel.id === id))

export { fetchCity }
