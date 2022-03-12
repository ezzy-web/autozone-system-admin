import Link from "next/link";
import { useRouter } from "next/router";

import InventoryLayout from "../../components/layout/inventory.page.layout";

function Inventory() {
  return (
    <>
      <InventoryLayout />
    </>
  );
}

export default Inventory;

export async function getServerSideProps() {
  // var data = []

  // try {
  //   const response = await fetch('https://gorest.co.in/public/v2/users')
  //   data = await response.json()

  //   console.log(data)
  // } catch (error) {
  //   console.log(error)
  // }

  return { props: { } };
}
