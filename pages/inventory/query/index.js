

import InventoryLayout from "../../../components/layout/inventory.page.layout";
import Head from 'next/head'



function Inventory({ paginationData, params, makes, cookies }) {
    return (
        <>
            <Head>
                <title>Javvys Autozone - Inventory Filter</title>
            </Head>
            <InventoryLayout paginationData={paginationData} params={params} makes={makes} cookies={cookies} />
        </>
    );
}

export default Inventory;

export async function getServerSideProps({ query }) {
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
