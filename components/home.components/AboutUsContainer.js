import { Grid, GridItem, HStack, Image, Box, Heading, Text } from "@chakra-ui/react";
import Container from "../elements/Container";



export default function AboutUsContainer() {
    return <Container>
        <Heading mb={10}>
            Why Choose Us?
        </Heading>

        <Grid templateColumns={'repeat(12, 1fr)'}>

            <GridItem padding={5} colSpan={{ base: 12, md: 4 }} >
                <HStack justifyContent={'flex-start'} alignItems={'flex-start'}>
                    <Box width={'20%'}>
                        <Image width={'full'} alt="" src="/assets/1x/icon-1.png" />
                    </Box>
                    <Box paddingX={5} width={'full'}>
                        <Heading mb={5} size={'md'} >Great Customer Experience</Heading>
                        <Text>Working as the Manufacturers’ Authorized Representative we keep your car in the best condition, helping you stay safe on the road for many more years to come.</Text>
                    </Box>
                </HStack>
            </GridItem>
            <GridItem padding={5} colSpan={{ base: 12, md: 4 }} >
                <HStack justifyContent={'flex-start'} alignItems={'flex-start'}>
                    <Box width={'20%'}>
                        <Image width={'full'} alt="" src="/assets/1x/icon-2.png" />
                    </Box>
                    <Box paddingX={5} width={'full'}>
                        <Heading mb={5} size={'md'} >Superior Quality</Heading>
                        <Text>Working as the Manufacturers’ Authorized Representative we keep your car in the best condition, helping you stay safe on the road for many more years to come.</Text>
                    </Box>
                </HStack>
            </GridItem>
            <GridItem padding={5} colSpan={{ base: 12, md: 4 }} >
                <HStack justifyContent={'flex-start'} alignItems={'flex-start'}>
                    <Box width={'20%'}>
                        <Image width={'full'} alt="" src="/assets/1x/icon-3.png" />
                    </Box>
                    <Box paddingX={5} width={'full'}>
                        <Heading mb={5} size={'md'} >Car Service and Mainenance</Heading>
                        <Text>Working as the Manufacturers’ Authorized Representative we keep your car in the best condition, helping you stay safe on the road for many more years to come.</Text>
                    </Box>
                </HStack>
            </GridItem>


        </Grid>
    </Container>
}