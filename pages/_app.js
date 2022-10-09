import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

import '../styles/global.css'
import '../styles/styles.css'

function MyApp({ Component, pageProps }) {
  return (

    <UserProvider supabaseClient={supabaseClient} >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
