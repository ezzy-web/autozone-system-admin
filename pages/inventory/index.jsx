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
