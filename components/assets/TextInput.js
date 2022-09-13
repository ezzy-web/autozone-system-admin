import React from 'react';

import { Box, Text, IconButton, Input, InputAddon, InputGroup } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'

export default function TextInput({ label, value, onChange, type }) {
    const [allowEdit, setAllowEdit] = React.useState(true)


    return (
        <Box my={3}>
            <Text py={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>{label}</Text>
            <InputGroup>
                <Input type={type ? type : 'text'} value={value} onChange={onChange} onKeyDown={(e) => { e.keyCode === 13 ? setAllowEdit(!allowEdit) : null }} my={1} px={2} size={'sm'} variant={allowEdit ? 'unstyled' : 'filled'} isReadOnly={allowEdit} borderRadius={0} />
                <InputAddon bg={'none'} border={'none'} >
                    <IconButton variant={'ghost'} colorScheme={'red'} onClick={() => setAllowEdit(!allowEdit)} borderRadius={'full'} size={'xs'} icon={<FeatherIcon size={14} icon={allowEdit ? 'edit' : 'x'} />} />
                </InputAddon>
            </InputGroup>
        </Box>
    )
}