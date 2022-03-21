import React from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";


import FeatherIcon from 'feather-icons-react'


export default function BreadcrumbContainer({ params = {} }) {
    const [queryParams, setQueryParams] = React.useState(params)


    React.useEffect(() => {
        setQueryParams(params)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Box paddingY={4} bgColor={'gray.100'}>
            <Breadcrumb paddingX={10} separator={<Box mx={2}><FeatherIcon size={6} icon={'circle'} fill={'#b2b2b2'} color={'#b2b2b2'} /></Box>}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                {queryParams.saved ? <></> :
                    <BreadcrumbItem isCurrentPage={queryParams.make ? false : true}>
                        <BreadcrumbLink href='/inventory'>Inventory</BreadcrumbLink>
                    </BreadcrumbItem>
                }


                {queryParams.make ? (
                    <BreadcrumbItem isCurrentPage={queryParams.model ? false : true}>
                        <BreadcrumbLink href={`/inventory/query?make=${queryParams.make}`}>{queryParams.make}</BreadcrumbLink>
                    </BreadcrumbItem>
                ) : null}

                {queryParams.model ? (
                    <BreadcrumbItem isCurrentPage={queryParams.vehicle ? false : true}>
                        <BreadcrumbLink href={`/inventory/query?make=${queryParams.make}&model=${queryParams.model}`} >{queryParams.model}</BreadcrumbLink>
                    </BreadcrumbItem>
                ) : null}

                {queryParams.vehicle ? (
                    <BreadcrumbItem isCurrentPage={queryParams.saved ? false : true} >
                        <BreadcrumbLink href={'/'}>{queryParams.vehicle}</BreadcrumbLink >
                    </BreadcrumbItem>
                ) : null}

                {queryParams.saved ? (
                    <BreadcrumbItem isCurrentPage >
                        <BreadcrumbLink href={'/'}>Saved</BreadcrumbLink >
                    </BreadcrumbItem>
                ) : null}


            </Breadcrumb>
        </Box >
    )
}