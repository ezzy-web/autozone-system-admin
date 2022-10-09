import { Box, Grid, GridItem, Heading, Divider } from '@chakra-ui/react';
import { useState } from 'react'
import useFeedback from "../../controller/hooks/useFeedback";
import NewVehicleForm from './form';

const styles = {
    PageContainer: {
        // bg: `url('/images/authbg.jpg')`,
        p: { base: 5, md: 10 }
    },

    PageResponsiveness: {
        templateColumns: 'repeat(12,1fr)'
    },


    GridItemResponsiveness: {
        colSpan: { base: 12, md: 7, lg: 9 }
    },


    CardContaianer: {
        background: 'rgba(255, 255, 255, 0.4)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        p: { base: 5, md: 10 }
    }
}



export default function NewVehicleComponent() {

    const { showError, render } = useFeedback()
    const [isLoading, setIsLoading] = useState(false)


    return (
        <>
            {render()}

            <Box {...styles.PageContainer} >
                <Grid {...styles.PageResponsiveness}>
                    <GridItem {...styles.GridItemResponsiveness}>
                        <Box {...styles.CardContaianer}>
                            <Box mb={10} >
                                <Heading size={'lg'} color={'black'} >Add New Vehicle</Heading>
                                <Divider mb={10} mt={5} />
                            </Box>


                            <NewVehicleForm />

                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}