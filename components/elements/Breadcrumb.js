import React from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from 'next/link'

import FeatherIcon from 'feather-icons-react'


export default function BreadcrumbContainer({ params }) {
    params = params ? params : []
    const [queryParams, setQueryParams] = React.useState([])


    React.useEffect(() => {
        const crumbs = params.filter((query) => {
            return query.key === 'make' | query.key === 'model'
        })
        setQueryParams(crumbs)
    }, [params])


    return (
        <Box paddingY={4} bgColor={'gray.100'}>
            <Breadcrumb paddingX={10} separator={<FeatherIcon size={6} icon={'circle'} fill={'#b2b2b2'} color={'#b2b2b2'} />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage={queryParams.length === 0 ? true : false}>
                    <BreadcrumbLink href='/inventory'>Inventory</BreadcrumbLink>
                </BreadcrumbItem>

                {queryParams.length >= 1 ? (
                    <BreadcrumbItem isCurrentPage={queryParams.length === 1 ? true : false}>
                        <BreadcrumbLink href={'/inventory/query?make='+queryParams.filter(({ key }) => key === 'make')[0].value}>{queryParams.filter(({ key }) => key === 'make')[0].value}</BreadcrumbLink>
                    </BreadcrumbItem>
                ) : (
                    <> </>
                )}

                {queryParams.length === 2 ? (
                    <BreadcrumbItem isCurrentPage={queryParams.length === 2 ? true : false}>
                        <BreadcrumbLink href={'/inventory/query?model='+queryParams.filter(({ key }) => key === 'model')[0].value}>{queryParams.filter(({ key }) => key === 'model')[0].value}</BreadcrumbLink >
                    </BreadcrumbItem>
                ) : <></>}


            </Breadcrumb>
        </Box >
    )
}