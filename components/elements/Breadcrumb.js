import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from 'next/link'

import FeatherIcon from 'feather-icons-react'


export default function BreadcrumbContainer() {
    return (
        <Box paddingY={4} bgColor={'gray.100'}>
            <Breadcrumb paddingX={10} separator={<FeatherIcon size={6} icon={'circle'} fill={'#b2b2b2'} color={'#b2b2b2'} />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='/'>Inventory</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Box>
    )
}