

import InventoryLayout from "../../components/layout/inventory.page.layout";

function Inventory({ paginationData, makes }) {
  return (
    <>
      <InventoryLayout paginationData={paginationData} makes={makes} />
    </>
  );
}

export default Inventory;

export async function getServerSideProps() {
  require('dotenv').config();

  var paginationData
  var makes = []

  var response = await fetch(`${process.env.BASE_URL}api/getMakes`)
  makes = await response.json()


  response = await fetch(`${process.env.BASE_URL}api/getInventory`)
  paginationData = await response.json()

  return { props: { paginationData, makes } };
}
