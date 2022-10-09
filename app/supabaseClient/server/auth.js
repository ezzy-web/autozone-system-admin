const { supabaseServer: supabase } = require('.')



const inviteUser = async (email) => {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email)
    console.log(data, error)
}


module.exports = { inviteUser }