import { ChakraProvider } from '@chakra-ui/react'
import '../styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle'


function MyApp({ Component, pageProps }) {
  return <ChakraProvider><Component {...pageProps} /></ChakraProvider>
}

export default MyApp
