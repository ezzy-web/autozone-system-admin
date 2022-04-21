import axios from "axios"


const httpClient = () => {
  return axios.create({
    baseURL: window.location.origin + "/.netlify/functions"
  })
}


const addActivity = (title, details) => {
  post("/createActivity", { title, details })
    .catch(err => {})
}


function post(url, content = {}) {
  const data = window.localStorage.getItem("user")
  const user = data ? JSON.parse(data) : null
  content['token'] = user?.token
  content['customToken'] = user?.customToken
  return httpClient().post(url, content)
}


export {
  post,
  httpClient,
  addActivity
}

