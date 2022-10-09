const { server: supabase } = require('../index')


const createAccount = async ({ first, last, email, password }) => {
    const res = await supabase.auth.admin.createUser({
        email,
        password,
        data: {
            first,
            last,
            role: 'pending',
            isActivated: false
        }
    })

    return res
}


export { createAccount }