import type { NextPage } from "next";
import LoginComponent from "../components/LoginPage";

const LoginPage: NextPage = () => {
  return (
    <>
      <head>
        <title>Autozone System Control | Login</title>
        <meta name="description" content="Autozone System Control" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <LoginComponent />
    </>
  );
};

export default LoginPage;
