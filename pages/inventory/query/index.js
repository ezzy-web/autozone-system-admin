

import InventoryLayout from "../../../components/layout/inventory.page.layout";

function Inventory({ paginationData, params, makes }) {
    return (
        <>
            <InventoryLayout paginationData={paginationData} params={params} makes={makes} />
        </>
    );
}

export default Inventory;

export async function getServerSideProps({ query }) {
    require('dotenv').config();


    var paginationData
    var makes = []

    var response = await fetch(`${process.env.BASE_URL}api/getMakes`)
    makes = await response.json()


    response = await fetch(`${process.env.BASE_URL}api/queryInventory`, {
        method: 'POST',
        body: JSON.stringify({ query })
    })

    paginationData = await response.json()

    return { props: { paginationData, params: query, makes } };
}