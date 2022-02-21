import axios from "axios"

import { Cookies } from "react-cookie"


const httpClient = () => {
  return axios.create({
    baseURL: window.location.origin + "/.netlify/functions"
  })
}


const addActivity = (title, details) => {
  post("/createActivity", { title, details })
    .catch(err => {
      console.log(err)
    })
}


function post(url, content = {}) {
  const cookie = new Cookies()
  content['token'] = cookie.get('user')?.token
  content['customToken'] = cookie.get('user')?.customToken
  return httpClient().post(url, content)
}


export {
  post,
  httpClient,
  addActivity
}

