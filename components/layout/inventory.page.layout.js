import { Grid, GridItem, SimpleGrid, Box, Accordion, AccordionButton, AccordionItem, Heading, AccordionIcon, HStack, AccordionPanel, Text, IconButton } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
import Navbar from '../navbar'
import BreadcrumbContainer from '../elements/Breadcrumb'

import FeatherIcon from 'feather-icons-react'
import Banner from '../elements/Banner'
import Select from 'react-select'
import InventoryContent from '../inventory.components/InventoryContent'
import FilterInventory from '../inventory.components/FilterInventory'



export default function InventoryLayout({ paginationData, params, makes }) {
    const router = useRouter()
    const [queryParams, setQueryParams] = React.useState(null)
    const [paginationState, setPaginationState] = React.useState(paginationData)
    const [currentParams, setCurrentParams] = React.useState(params)
    const [refresh, setRefresh] = React.useState(false)

    const removeParam = (key) => {
        var newParamState = JSON.parse(JSON.stringify(currentParams))
        
        if (key === 'make') {
            newParamState['model'] = null
        }
        newParamState[key] = null
        
        var isQuery = false
        var query = {}
        for (const [key, value] of Object.entries(newParamState)) {
            if (value && value != '') {
                query[key] = value
                isQuery = true
            }
        }

        if (isQuery) {
            const params = new URLSearchParams(query)
            router.push('/inventory/query?' + params.toString())
            setCurrentParams(query)
            setRefresh(true)
            return;
        }
        router.push('/inventory')
        setCurrentParams(query)
    }

    const handleQueryParamsChange = () => {
        if (currentParams) {
            var querries = []
            for (const [key, value] of Object.entries(currentParams)) {
                querries.push({ key, value })
            }
            setQueryParams(querries)
        } else {
            setQueryParams([])
        }
    }

    const refreshData = async () => {
        const response = await fetch('http://localhost:3000/api/queryInventory', {
            method: 'POST',
            body: JSON.stringify({ query: currentParams })
        }).catch(error => console.log(error))

        const data = await response.json().catch(error => console.log(error))
        setPaginationState(data)
        setRefresh(false)
    }
    
    React.useEffect(() => {
        handleQueryParamsChange()
        if (refresh) refreshData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentParams])

    return (
        <>
            <Navbar />
            <Box bg={'linear-gradient(90deg,#9b3e3e,#ff6d1e)'} h={1} width='full' ></Box>
            <Banner />
            <BreadcrumbContainer params={currentParams} />

            <Grid marginTop={10} templateRows={'repeat(2, 1fr)'} templateColumns={'repeat(12, 1fr)'}>

                <GridItem paddingX={2} rowSpan={2} colSpan={{ base: 12, md: 3 }} >
                        <Box padding={5} bgColor={'gray.100'}>
                            <Text fontWeight={'medium'} fontSize={'md'} color={'gray.600'}>{`${paginationState?.resultsCount} ${paginationState?.resultsCount === 1 ? 'Result' : 'Results'}`} Found</Text>
                        </Box>
                        <Box padding={2}>
                            <SimpleGrid minChildWidth={100}>
                                {queryParams ? (
                                    <>
                                        {queryParams.map((query, key) => {
                                            return (
                                                <HStack key={key} marginY={1} borderRadius={3} paddingY={1} paddingX={2} bgColor={'gray.200'} maxWidth={100} justifyContent={'space-between'} alignItems={'center'}>
                                                    <Text fontSize={'sm'} isTruncated>{ query.value }</Text>
                                                    <IconButton variant={'ghost'} size={'xs'} onClick={() => removeParam(query.key)} icon={<FeatherIcon size={14} icon='x' />} />
                                                </HStack>
                                            )
                                        })}
                                    </>
                                ) : (<></>)}

                            </SimpleGrid>
                        </Box>
                        <Box  position={'sticky'} top={0}>
                            <Accordion>
                                <AccordionItem>
                                    <AccordionButton paddingY={5}>
                                        <HStack width={'full'} justifyContent={'space-between'}>
                                            <Heading size={'sm'}>
                                                Sort Inventory
                                            </Heading>

                                            <AccordionIcon />
                                        </HStack>
                                    </AccordionButton>

                                    <AccordionPanel>
                                        <Select
                                            options={[]}
                                            placeholder='Sort by'
                                            classNamePrefix="form-select-index"
                                        />
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton paddingY={5}>
                                        <HStack width={'full'} justifyContent={'space-between'}>
                                            <Heading size={'sm'}>
                                                Filter Inventory
                                            </Heading>

                                            <AccordionIcon />
                                        </HStack>

                                    </AccordionButton>

                                    <AccordionPanel>
                                        <FilterInventory makes={makes} setCurrentParams={setCurrentParams} setRefresh={setRefresh} currentParams={currentParams} />
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Box>
                </GridItem>

                <GridItem rowSpan={2} colSpan={{ base: 12, md: 9 }} >
                    <InventoryContent params={currentParams} isMore={paginationState?.lastDocumentId ? true : false} paginationState={paginationState} />
                </GridItem>

            </Grid>
        </>

    )
}