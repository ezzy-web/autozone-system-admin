import React from 'react'

import { MenuList, MenuItem, Menu, MenuDivider, Text, MenuButton, Box, Input, InputGroup, HStack, Button } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'
import MakeModelModule from '../Forms/MakeModelModule'

export default function MakeModelInput({ selectedMake, selectedModel }) {
    const models = []


    const [val, setVal] = React.useState(selectedMake ? selectedMake : '')



    return (
        <>
            <Menu>
                <MenuButton w={'full'} bg={'gray.100'} p={3} borderRadius={'md'}>
                    <HStack alignItems={'center'} justifyContent={'space-between'} fontSize={'sm'} fontWeight={'medium'} >
                        <Text color={'gray.600'}>Make/Model</Text>
                        <HStack justifyContent={'space-between'}>
                            <Text color={'red.600'} pl={10}>{selectedMake} {selectedModel}</Text>
                            <FeatherIcon size={14} icon={'chevron-down'} />
                        </HStack>
                    </HStack>
                </MenuButton>
                <MenuList>
                    <Box px={2}>
                        <InputGroup size={'sm'}>
                            <Input value={val} onChange={(e) => setVal(e.target.value)} variant={'unstyled'} placeholder={'Search Make'} />
                        </InputGroup>
                    </Box>

                    <MenuDivider />



                    {
                        val === '' ?
                            <>
                                <Box p={10}>
                                    <Text color={'gray.500'} textAlign={'center'} fontSize={'x-small'}>Search for a make</Text>
                                </Box>
                            </>
                            :
                            <>

                                {models.length === 0 ?
                                    <>
                                        <Box p={10}>
                                            <Text color={'gray.500'} textAlign={'center'} fontSize={'x-small'}>No models matching {val}</Text>
                                        </Box>
                                    </>
                                    :

                                    <>
                                        <Text px={2} fontSize={'x-small'}>Showing models for {val} </Text>

                                        {models.map(model => (
                                            <MenuItem key={model}>{model}</MenuItem>
                                        ))}
                                    </>

                                }

                            </>

                    }


                    <MenuDivider />

                    {/* <MakeModelModule modalButton={({ onClick, ref }) => (
                        <Button onClick={onClick} ref={ref} isFullWidth variant={'ghost'} size={'xs'} colorScheme={'red'} borderRadius={0}>
                            Add New Make/Model
                        </Button>
                    )} /> */}


                </MenuList>
            </Menu>
        </>
    )
}