import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { useMemo } from 'react'
import { CookieContext } from '../server/utils/context'
import { parseCookies } from '../server/utils/lib'
import cookieFunc from '../server/cookie.functions'

import '../styles/style.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// // import 'bootstrap/dist/js/bootstrap.bundle'



function MyApp({ Component, pageProps, ... cookies }) {
  const cookieContext = useMemo(() => {
    return cookieFunc()
  })
  return (
    <CookieContext.Provider value={cookieContext}>
      <ChakraProvider>
        <Component {...pageProps} cookies={cookies} />
      </ChakraProvider>
    </CookieContext.Provider>
  )
}

MyApp.getInitialProps = async ({ ctx }) => {
  const cookies = parseCookies(ctx.req)
  return {
    cookies
  }
}

export default MyApp

