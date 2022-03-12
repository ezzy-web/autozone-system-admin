import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";


import HomeLayout from "../components/layout/home.page.layout";
import RecentlyVisited from "../components/recent-vehicle-component";
import VehicleCard from "../components/vehicle.card.container";
import { SimpleGrid } from "@chakra-ui/react";
import InventoryContent from "../components/inventroy.components/InventoryContent";

function Recents({ recents }) {
  if (recents) {
    return <InventoryContent vehicles={recents} isMore={false} isConstant={true} />
  }

  return <></>;
}

function NewArrival({ newArrival }) {
  if (newArrival) {
    return <InventoryContent vehicles={newArrival} isMore={false} isConstant={true} />
  }

  return <></>;
}

function Featured({ featured }) {
  if (featured) {
    return <InventoryContent vehicles={featured} isMore={false} isConstant={true} />
  }
  return <></>;
}

function Home({ featured = [1,2,3,4,2,3], newArrival = [1, 1, 1, 1,1,1], makes = [] }) {
  // const recents = [{ name: "Nissan Skyline" }, { name: "Toyota Hiace" },{ name: "Nissan Skyline" }, { name: "Toyota Hiace" },{ name: "Nissan Skyline" }, { name: "Toyota Hiace" }];
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
