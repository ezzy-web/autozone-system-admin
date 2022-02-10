import axios from "axios"

const httpClient = () => {
  return axios.create({
      baseURL: window.location.origin + "/.netlify/functions"
  })
}

export default httpClient
