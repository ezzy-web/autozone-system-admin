import React from "react";
import Head from "next/head";
import { getSavedVehicleFromCookie, parseCookies } from "../server/utils/lib";

import SavedPageLayout from "../components/layout/saved.page.layout";

function Saved({ saved }) {
  const [savedVehicles, setSavedVehicles] = React.useState(
    saved.filter((vehicle) => vehicle !== null)
  );

  return (
    <>
      <Head>
        <title>{`Javvy's Autozone - Jamaica Used Car Dealer | Favourites`}</title>
      </Head>
      <SavedPageLayout savedVehicle={savedVehicles} />
    </>
  );
}

export default Saved;

export async function getServerSideProps(context) {
  const cookies = parseCookies(context.req);
  const cookieSaved = getSavedVehicleFromCookie(cookies);

  var saved = [];

  for (
    var savedIndex = 0;
    savedIndex < (cookieSaved.length < 7 ? cookieSaved.length : 6);
    savedIndex++
  ) {
    var response = await fetch(`${process.env.BASE_URL}api/queryInventory`, {
      method: "POST",
      body: JSON.stringify({
        query: { id: cookieSaved[savedIndex].id },
      }),
    }).catch((error) => console.log(error));

    var data;
    if (response) {
      data = await response.json().catch((error) => console.log(error));
      saved.push(data && data?.docs[0] ? data?.docs[0] : null);
    }
  }
  return { props: { saved } };
}
