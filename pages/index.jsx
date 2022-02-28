import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import HomeLayout from "../components/layout/homePageLayout";

function Recents({ recents }) {
  if (recents) {
    return <></>;
  }

  return <></>;
}

function NewArrival({ newArrival }) {
  if (newArrival) {
    return <></>;
  }

  return <></>;
}

function Featured({ featured }) {
  if (featured) {
    return <></>;
  }
  return <></>;
}

function Home({ featured = [], newArrival = [], makes = [] }) {
  const recents = [];
  const saved = [];

  const components = {
    saved,
    recents: recents.length === 0 ? null : <Recents recents={recents} />,
    newArrival:
      newArrival.length === 0 ? null : <NewArrival newArrival={newArrival} />,
    featured: featured.length === 0 ? null : <Featured featured={featured} />,
    makes,
  };

  return (
    <>
      <HomeLayout {...components} />
    </>
  );
}

export default Home;
