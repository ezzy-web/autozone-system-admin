import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";


import HomeLayout from "../components/layout/home.page.layout";
import RecentlyVisited from "../components/recent-vehicle-component";
import InventoryContent from "../components/inventroy.components/InventoryContent";

function Recents({ recents }) {
  if (recents) {
    return <InventoryContent paginationState={{ docs: recents }} isMore={false} isConstant={true} />
  }
  return <></>;
}



function Home({ featured , newArrival, makes }) {
  const recents = [];
  const saved = [];

  const components = {
    saved,
    recents: recents.length === 0 ? null : <Recents recents={recents} />,
    newArrival: newArrival?.length === 0 ? <InventoryContent paginationState={{ docs: [] }} isMore={false} isConstant={true} /> : <InventoryContent paginationState={{ docs: newArrival }} isMore={false} isConstant={true} />,
    featured: featured?.length === 0 ? <InventoryContent paginationState={{ docs: [] }} isMore={false} isConstant={true} /> : <InventoryContent paginationState={{ docs: featured }} isMore={false} isConstant={true} />,
    makes,
  };

  return (
    <>
      <HomeLayout {...components} />
    </>
  );
}

export default Home;


export async function getServerSideProps(context) {
  var [ featured, newArrival, makes ] = [[], [], []]
  
  var response = await fetch('http://localhost:3000/api/getMakes')
  makes = await response.json()


  response = await fetch('http://localhost:3000/api/getFeatured')
  featured = await response.json()


  response = await fetch('http://localhost:3000/api/getNewArrivals')
  newArrival = await response.json()
  console.log(newArrival)



  return { props: {
      newArrival,
      featured,
      makes
  }}
}
