import React from 'react'


import { Box } from '@chakra-ui/react'



function Container({ children }) {
    return (<Box px={{ base: 2, md: 70, lg: 50, xl: 40 }} py={10} >{children}</Box>)
}


export default Container