import { Center, ChakraProvider, Spinner } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { CookieContext, AlertContext } from '../server/utils/context'
import { parseCookies } from '../server/utils/lib'
import cookieFunc from '../server/cookie.functions'

import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'

import '../styles/style.css'


import { extendTheme } from '@chakra-ui/react'

const focusBehaviour = extendTheme({
  config: {
    cssVarPrefix: 'autozone-ja'
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          outline: 'none',
          boxShadow: 'none'
        }
      }
    }
  }
})

function MyApp({ Component, pageProps, cookies }) {
  const [alertState, setAlertState] = useState({
    show: false,
    message: '',
    status: '',
    title: null,
    loading: false
  })

  const cookieContext = useMemo(() => {
    return cookieFunc()
  }, [])

  const alertContext = useMemo(() => {
    return {
      showAlert: (state) => {
        setAlertState(state)
        setTimeout(() => setAlertState({
          show: false,
          message: '',
          status: ''
        }), 5000)
      },

      isLoading: (loading) => {
        if (loading) {
          setAlertState({ show: true, loading: true })
          return
        }
        setAlertState({ show: false, loading: false })

      }
    }
  }, [])


  return (
    <CookieContext.Provider value={cookieContext}>
      <ChakraProvider resetCSS theme={focusBehaviour} >
        <AlertContext.Provider value={alertContext}>
          {alertState.show ? (
            <Alert width={'1/3'} position={'fixed'} bottom={5} right={5} left={5} zIndex={100} status={alertState.loading ? 'success' : alertState.status}>
              {alertState.loading ? <Center width={'full'}><Spinner /></Center> :
                <>
                  <AlertIcon />
                  <Box flex='1'>
                    <AlertTitle>{alertState?.title ? alertState.title : ''}</AlertTitle>
                    <AlertDescription display='block'>{alertState.message}</AlertDescription>
                  </Box>
                  <CloseButton position='absolute' right='8px' top='8px' />
                </>

              }

            </Alert>
          ) : <></>}
          <Component {...pageProps} cookies={cookies} />

        </AlertContext.Provider>
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

