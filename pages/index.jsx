import React from 'react' 

import HomeLayout from "../components/layout/home.page.layout";
import InventoryContent from "../components/inventory.components/InventoryContent";
import Head from 'next/head'

import { getRecentVehicleFromCookie, getSavedVehicleFromCookie, parseCookies } from "../server/utils/lib";


function Home({ featured , newArrival, makes, recents, cookies }) {
  recents = recents.filter((doc) => doc ? true : false);
  const saved = getSavedVehicleFromCookie(cookies);
  
  const components = {
    saved,
    recents: recents.length === 0 ? null : recents,
    newArrival: newArrival?.length === 0 ? <InventoryContent paginationState={{ docs: [] }} isMore={false} isConstant={true} /> : <InventoryContent paginationState={{ docs: newArrival }} isMore={false} isConstant={true} />,
    featured: featured?.length === 0 ? <InventoryContent paginationState={{ docs: [] }} isMore={false} isConstant={true} /> : <InventoryContent paginationState={{ docs: featured }} isMore={false} isConstant={true} />,
    makes,
  };

  const titleContent = `Javvy's Autozone - Jamaica Used Car Dealer`

  return (
    <>
    <Head>
      <title>{titleContent}</title>
      <meta name='description' content={`Javvy's Autozone Ltd. here to provide you with the very best services a competitive and affordable prices. Come experience the quality service you deserve and the supreme quality you expect.`} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
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
