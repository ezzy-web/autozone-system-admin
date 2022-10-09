import Head from "next/head"
import RegisterComponent from "../components/RegisterComponent"


export default function RegisterPage() {


    return (
        <>
            <Head>
                <title>Autozone System Control | Register</title>
                <meta name="description" content="Autozone System Control" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <RegisterComponent />
        </>
    )
}