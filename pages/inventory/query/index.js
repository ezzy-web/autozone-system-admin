

import InventoryLayout from "../../../components/layout/inventory.page.layout";

function Inventory({ paginationData, params }) {
    return (
        <>
            <InventoryLayout paginationData={paginationData} params={params} />
        </>
    );
}

export default Inventory;

export async function getServerSideProps({ query }) {
    var paginationData
    const response = await fetch('http://localhost:3000/api/queryInventory', {
        method: 'POST',
        body: JSON.stringify({query})
    })

    paginationData = await response.json()

    return { props: { paginationData, params: query } };
}
