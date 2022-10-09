import { Input, Button, HStack, Heading, Box, useDisclosure, Divider, Text, IconButton, Center, InputGroup, InputRightAddon, FormLabel, Collapse, Tooltip } from "@chakra-ui/react"

import { useState, useRef, useEffect } from 'react'


import useFeedback from "../../../controller/hooks/useFeedback"
import ModalContainer from "../../Modal"


import FeatherIcon from 'feather-icons-react'

import useMake from "../../../controller/hooks/useMake"
import useModel from "../../../controller/hooks/useModel"

function ModelContainer({ data }) {

    

    console.log("Model: ", data)

    return (
        <HStack my={2}>
            <HStack>
                <IconButton borderRadius={'full'} variant={'ghost'} colorScheme={'red'} size={'xs'} icon={<FeatherIcon size={12} icon={'minus'} />} />
                <IconButton variant={'ghost'} size={'xs'} icon={<FeatherIcon size={12} icon={'edit'} />} />
            </HStack>
            <Input fontSize={'small'} size={'sm'} value={data.name} />
        </HStack>
    )
}


function MakeContainer({ data, handleDeleteMake }) {
    const [isReadOnly, setIsReadOnly] = useState(true)
    const { isOpen, onToggle } = useDisclosure()
    const [modelValue, setModelValue] = useState('')


    const { models, handleAddModel, handleDeleteModel } = useModel(data.id)

    console.log(models)

    return (
        <Box my={2} borderWidth={'thin'} p={2} bg={'whiteAlpha.300'}>
            <HStack justifyContent={'space-between'}>
                <Input onKeyDown={e => { e.keyCode === 13 ? console.log('Saved') : null }} size={'sm'} variant={isReadOnly ? 'unstyled' : 'filled'} isReadOnly={isReadOnly} value={data?.name} onChange={() => console.log('Change')} />

                <HStack>
                    <IconButton onClick={() => setIsReadOnly(!isReadOnly)} borderRadius={'full'} size={'sm'} icon={<FeatherIcon size={14} icon={isReadOnly ? "edit" : "x"} />} />
                    <IconButton
                        borderRadius={'full'}
                        colorScheme={'red'}
                        variant={'ghost'}
                        size={'sm'}
                        icon={
                            <FeatherIcon size={14} icon={'minus'} />
                        }
                        onClick={() => handleDeleteMake(data.id)} />
                </HStack>

            </HStack>


            <HStack px={3} my={3} justifyContent={'space-between'} alignItems={'center'}>
                <Text fontWeight={'medium'} fontSize={'sm'}>Models</Text>

                <Button onClick={onToggle} variant={'link'} fontWeight={'medium'} fontSize={'xs'}>{isOpen ? "Hide Models" : "Show Models"}</Button>
            </HStack>
            <Box>

            </Box>

            <Collapse in={isOpen} >
                <Box>
                    {models.length === 0 ?
                        <Center fontSize={'x-small'} p={5}>No Models</Center>
                        :
                        models.map(model => (<ModelContainer key={model.id} data={model} handleAddModel={handleAddModel} handleDeleteModel={handleDeleteModel} />))}
                </Box>


                <HStack>

                    <Input fontSize={'small'} size={'sm'} placeholder={"Add new model"} value={modelValue} onChange={e => setModelValue(e.target.value)} />
                    <Tooltip label={"Add Model"}>
                        <IconButton variant={'ghost'} size={'xs'} icon={<FeatherIcon size={12} icon={'plus'} />} onClick={() => handleAddModel(modelValue)} />
                    </Tooltip>

                </HStack>

            </Collapse>
        </Box>
    )
}


export default function MakeModelModule() {
    const { showError, showSuccess, render } = useFeedback()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const modalToggle = useRef()


    const { makes, handleDeleteMake, handleAddMake } = useMake()
    const [makeInput, setMakeInput] = useState('')



    return (
        <>

            {render()}
            <HStack justifyContent={'end'}>
                <Button onClick={onOpen} variant={"ghost"} colorScheme={'red'} size={'sm'} ref={modalToggle} >Manage Vehicle Models</Button>
            </HStack>



            <ModalContainer size={'md'} isOpen={isOpen} onClose={onClose} toggleRef={modalToggle}

                header={() => (
                    <Heading size={'md'} color={'red.700'}>
                        Manage Vehicle Make/Models
                    </Heading>
                )}
                body={() => (
                    <Box>
                        <Heading color={'gray.800'} size={'sm'}>Makes</Heading>

                        <Divider my={2} />


                        {makes.map(make => (
                            <MakeContainer key={make.id} data={make} handleDeleteMake={handleDeleteMake} />
                        ))}


                        <Box my={10}>
                            <FormLabel textAlign={'center'} fontSize={'sm'} >Add Vehicle Make</FormLabel>
                            <HStack>
                                <InputGroup size={'sm'}>
                                    <Input value={makeInput} onChange={(e) => setMakeInput(e.target.value)} />
                                    <InputRightAddon bg={'transparent'} border={'none'}>
                                        <IconButton
                                            size={'sm'}
                                            borderRadius={'full'}
                                            icon={
                                                <FeatherIcon size={'16'} icon={'plus'} />
                                            }
                                            onClick={async () => { await handleAddMake(makeInput); setMakeInput("") }} />
                                    </InputRightAddon>
                                </InputGroup>
                            </HStack>
                        </Box>

                    </Box>
                )}
            />


        </>
    )
}