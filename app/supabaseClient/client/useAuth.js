import { useState } from "react";
import { supabaseClient as supabase } from ".";




export default function Auth() {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState()


    const handleError = (error) => {
        if (error) {
            setIsError(true)
            setError(error)

            return true
        }

        return false
    }


    const signInWithEmailAndPassword = async (email, password) => {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password })
        handleError(error) ? null : console.log(user)
    }

    const registerNewUser = async ({ email, first_name, last_name, role, position }) => {
        const { user, error } = await supabase.auth.signUp({ email, password, data: { first_name, last_name, role, position } })
        handleError(error) ? null : console.log(user)
    }


    const signOut = async () => {
        const { error } = supabase.auth.signOut()
        handleError(error)
    }



    return { loading, user, signInWithEmailAndPassword, registerNewUser, signOut, isError, error }
}