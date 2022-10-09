import { useState } from 'react'

const usePasswordVisibilityController = () => {


    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const togglePasswordVisibility = () => setPasswordVisibility(!passwordVisibility)


    return { togglePasswordVisibility, inputAttr: {
        type: passwordVisibility ? 'text' : 'password'
    }, iconAttr: {
        icon: passwordVisibility ? 'eye-off' : 'eye'
    } }
}


export default usePasswordVisibilityController