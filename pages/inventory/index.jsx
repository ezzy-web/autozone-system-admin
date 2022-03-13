

import InventoryLayout from "../../components/layout/inventory.page.layout";

function Inventory({ paginationData }) {
  return (
    <>
      <InventoryLayout paginationData={paginationData} />
    </>
  );
}

export default Inventory;

export async function getServerSideProps() {
  var paginationData
  const response = await fetch('http://localhost:3000/api/getInventory')
  paginationData = await response.json()

  return { props: { paginationData } };
}
