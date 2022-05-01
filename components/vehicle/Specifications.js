import React from 'react';
import { Box, HStack, Text, IconButton, Input, InputAddon, InputGroup, Divider } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'

export default function Specifications() {
    return (
        <Box mt={10}>
            <Text fontWeight={'medium'} textTransform={'uppercase'} >Vehicle Description</Text>
            <Divider mb={10} />
            <Box>
                <HStack justifyContent={'space-between'} >
                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Make</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}

                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Model</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}
                </HStack>
                <Divider my={3} />


                <HStack justifyContent={'space-between'} >
                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Submodel</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}

                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Year</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}
                </HStack>
                <Divider my={3} />


                <HStack justifyContent={'space-between'} >
                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Body Type</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}

                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Colour</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}
                </HStack>
                <Divider my={3} />


                <HStack justifyContent={'space-between'} >
                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Chassis Number</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}

                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Engine Number</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}
                </HStack>
                <Divider my={3} />

                <HStack justifyContent={'space-between'} >
                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Engine Size</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}

                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Mileage</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}
                </HStack>
                <Divider my={3} />

                <HStack justifyContent={'space-between'} >
                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Transmission</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}

                    <></>
                </HStack>
                <Divider my={3} />
            </Box>

            <Text mt={10} fontWeight={'medium'} textTransform={'uppercase'} >Vehicle Information</Text>
            <Divider mb={10} />
            <Box>
                <HStack justifyContent={'space-between'} >
                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Engine Size</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}

                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Mileage</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}
                </HStack>
                <Divider my={3} />

                <HStack justifyContent={'space-between'} >
                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Transmission</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}

                    <></>
                </HStack>
                <Divider my={3} />
            </Box>


            <Text mt={10} fontWeight={'medium'} textTransform={'uppercase'} >Pricing Information</Text>
            <Divider mb={10} />
            <Box>
                <HStack justifyContent={'space-between'} >
                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Asking Price</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}

                    {(() => {
                        const [allowEdit, setAllowEdit] = React.useState(true)
                        return (
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text px={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Price Condition</Text>
                                    <InputGroup>
                                        <Input onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                                        <InputAddon bg={'none'} border={'none'} >
                                            <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                                        </InputAddon>
                                    </InputGroup>

                                </Box>

                            </HStack>
                        )
                    })()}
                </HStack>
            </Box>
        </Box>

    );
}
