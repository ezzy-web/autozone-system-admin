import React from "react"


const usePasswordVisibility = () => {
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false)

  const togglePasswordVisibiity = () => setPasswordIsVisible(!passwordIsVisible)
  return {
    props: {
      type: passwordIsVisible ? 'text' : 'password'
    },
    togglePasswordVisibiity,
    passwordIsVisible
  }
}


export default usePasswordVisibility