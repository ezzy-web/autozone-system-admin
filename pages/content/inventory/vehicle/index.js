import Head from "next/head";
import NewVehicleComponent from "../../../../components/NewVehicleComponent";
import Dashboard from "../../../../components/layouts/Dashboard";


export default function NewVehiclePage() {


  return (
    <>
      <Head>
        <title>Autozone System Control | Add to Inventory</title>
        <meta name="description" content="Autozone System Control" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard page={'Inventory'} >
        <NewVehicleComponent />
      </Dashboard>


    </>
  )
}