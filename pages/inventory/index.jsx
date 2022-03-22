import InventoryLayout from "../../components/layout/inventory.page.layout";
import Head from "next/head";



function Inventory({ paginationData, makes, cookies }) {
  return (
    <>
    <Head>
      <title>{`Javvy's Autozone - Jamaica Used Card Dealer | Inventory`}</title>
    </Head>
      <InventoryLayout paginationData={paginationData} makes={makes} cookies={cookies} />
    </>
  );
}

export default Inventory;

export async function getServerSideProps() {
  var paginationData;
  var makes = [];

  var response = await fetch(`${process.env.BASE_URL}api/getMakes`).catch(
    (error) => console.log(error)
  );
  makes = response ? await response.json() : [];

  response = null;
  response = await fetch(`${process.env.BASE_URL}api/getInventory`).catch(
    (error) => console.log(error)
  );
  paginationData = response
    ? await response.json()
    : { lastDocumentId: "", docs: [] };

  return { props: { paginationData, makes } };
}
