import Head from "next/head";
import LoginComponent from "../components/LoginComponent";


export default function LoginPage() {


  return (
    <>
      <Head>
        <title>Autozone System Control | Login</title>
        <meta name="description" content="Autozone System Control" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginComponent />
    </>
  )
}