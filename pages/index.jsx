import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import HomeLayout from "../components/layout/homePageLayout";

function Home() {

  const components = {
    recents: <>Hello</>
  }


  return (
    <>
      <HomeLayout { ... components} />
    </>
  );
}

export default Home;
