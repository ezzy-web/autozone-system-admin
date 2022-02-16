import axios from "axios"

const httpClient = () => {
  return axios.create({
    baseURL: window.location.origin + "/.netlify/functions"
  })
}



const addActivity = (title, details) => {
  httpClient().post("/createActivity", { title, details })
    .catch(err => {
      console.log(err)
    })
}

export {
  httpClient,
  addActivity
}

