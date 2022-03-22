import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import VehiclePageLayout from "../../../components/layout/vehicle.page.layout";
import { CookieContext } from "../../../server/utils/context";

export default function VehiclePage({ vehicle, relatedVehicles, cookies }) {
  const { addRecentVehicle } = React.useContext(CookieContext);
  relatedVehicles.docs = relatedVehicles.docs.filter(
    (doc) => vehicle.id != doc.id
  );
  React.useEffect(() => addRecentVehicle(vehicle.id));

  return (
    <>
      <Head>
        <title>Javvys Autozone - {vehicle?.title}</title>
      </Head>
      <VehiclePageLayout vehicle={vehicle} related={relatedVehicles} cookies={cookies} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { stockNo } = params;

  var response = await fetch(`${process.env.BASE_URL}api/getVehicle`, {
    method: "POST",
    body: JSON.stringify({ id: stockNo }),
  });
  const vehicle = await response.json();

  response = await fetch(`${process.env.BASE_URL}api/queryInventory`, {
    method: "POST",
    body: JSON.stringify({
      query: {
        yearMin: vehicle.year,
        body: vehicle.body,
      },
      limit: 6,
    }),
  });

  const relatedVehicles = await response.json();
  return { props: { vehicle, relatedVehicles } };
}
