import React from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";


import FeatherIcon from 'feather-icons-react'


export default function BreadcrumbContainer({ params = {} }) {
    const [queryParams, setQueryParams] = React.useState(params)


    const BreadcrumbStyle = {
        transition: '0.5s',
        fontSize: '90%',
        _hover: {
            textDecoration: 'none',
            color: 'red.700'
        },
        _focus: { boxShadow: 'none', outline: 'none' }
    }

    React.useEffect(() => {
        setQueryParams(params)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Box paddingY={4} bgColor={'gray.100'}>
            <Breadcrumb spacing={1} paddingX={5} separator={'/'}>
                <BreadcrumbItem >
                    <BreadcrumbLink {...BreadcrumbStyle} href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                {queryParams.saved ? <></> :
                    <BreadcrumbItem isCurrentPage={queryParams.make ? false : true}>
                        <BreadcrumbLink {...BreadcrumbStyle} fontWeight={queryParams.make ? '' : 'bold'} href='/inventory'>Inventory</BreadcrumbLink>
                    </BreadcrumbItem>
                }


                {queryParams.make ? (
                    <BreadcrumbItem isCurrentPage={queryParams.model ? false : true}>
                        <BreadcrumbLink {...BreadcrumbStyle} fontWeight={queryParams.model ? '' : 'bold'} href={`/inventory/query?make=${queryParams.make}`}>{queryParams.make}</BreadcrumbLink>
                    </BreadcrumbItem>
                ) : null}

                {queryParams.model ? (
                    <BreadcrumbItem isCurrentPage={queryParams.vehicle ? false : true}>
                        <BreadcrumbLink {...BreadcrumbStyle} fontWeight={queryParams.vehicle ? '' : 'bold'} href={`/inventory/query?make=${queryParams.make}&model=${queryParams.model}`} >{queryParams.model}</BreadcrumbLink>
                    </BreadcrumbItem>
                ) : null}

                {queryParams.vehicle ? (
                    <BreadcrumbItem isCurrentPage={queryParams.saved ? false : true} >
                        <BreadcrumbLink {...BreadcrumbStyle}  fontWeight={queryParams.saved ? '' : 'bold'} href={'/'}>{queryParams.vehicle}</BreadcrumbLink >
                    </BreadcrumbItem>
                ) : null}

                {queryParams.saved ? (
                    <BreadcrumbItem isCurrentPage >
                        <BreadcrumbLink {...BreadcrumbStyle} fontWeight={'bold'} href={'/'}>Favourites</BreadcrumbLink >
                    </BreadcrumbItem>
                ) : null}


            </Breadcrumb>
        </Box >
    )
}