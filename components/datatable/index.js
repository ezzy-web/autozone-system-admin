import React from 'react'
import DataTable from 'react-data-table-component'


export default function InfoTable({ columns, data }) {
    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                pagination
                fixedHeaderScrollHeight='100vh'
                pointerOnHover={true}
                persistTableHead={true}
                
            />
        </>
    )
}