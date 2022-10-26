import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, cookieStorageManager } from "@chakra-ui/react";
import UserContextProvider from "../context/user-context/provider.context";

function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <UserContextProvider
      children={
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      }
    />
  );
}

export default MyApp;

