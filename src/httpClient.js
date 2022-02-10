import axios from "axios"

const httpClient = () => {
  return axios.create({
      baseURL: window.location.origin
  })
}

export default httpClient
