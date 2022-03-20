import React from 'react' 

import HomeLayout from "../components/layout/home.page.layout";
import InventoryContent from "../components/inventory.components/InventoryContent";

import { getRecentVehicleFromCookie, parseCookies } from "../server/utils/lib";


function Home({ featured , newArrival, makes, recents }) {
  recents = recents.filter((doc) => doc ? true : false);
  const saved = [];

  const components = {
    saved,
    recents: recents.length === 0 ? null : recents,
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


  const cookies = parseCookies(context.req)
  const cookieRecent = getRecentVehicleFromCookie(cookies)

  var recents = []

  for (var recentIndex = 0; recentIndex < (cookieRecent.length < 7 ? cookieRecent.length : 6); recentIndex++) {
    var response = await fetch(`${process.env.BASE_URL}api/queryInventory`, {
      method: 'POST',
      body: JSON.stringify({
        query: { id: cookieRecent[recentIndex].id }
      })
    }).catch( error => console.log(error))

    var data
    if (response) {
      data = await response.json().catch(error => console.log(error))
      recents.push(data && data?.docs[0] ? {
        vehicle: data?.docs[0],
        timeStamp: cookieRecent[recentIndex].timeStamp
      } : null )
    }
  }

  var [ featured, newArrival, makes ] = [[], [], []]
  
  var response = await fetch(`${process.env.BASE_URL}api/getMakes`).catch(error => console.log(error))
  makes = response ? await response.json() : []


  response = await fetch(`${process.env.BASE_URL}api/getFeatured`).catch(error => console.log(error))
  featured = response ? await response.json() : []


  response = await fetch(`${process.env.BASE_URL}api/getNewArrivals`).catch(error => console.log(error))
  newArrival = response ? await response.json() : []



  return { props: {
      newArrival,
      featured,
      makes,
      recents
  }}
}
