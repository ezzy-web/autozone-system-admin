import React from 'react'

import { Box, Image } from '@chakra-ui/react';


export default function Banner() {
    return (
        <Box overflow={'hidden'} h={'80px'} display={'flex'} justifyContent='center' alignItems={'center'}>
            <Image w={'100%'} src='/assets/Banner.jpg' />
        </Box>
    );
}