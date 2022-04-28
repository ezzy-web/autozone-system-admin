
import { Button, Drawer, DrawerHeader, DrawerOverlay, DrawerContent, HStack, DrawerBody, DrawerCloseButton, DrawerFooter, Text } from "@chakra-ui/react"
import FeatherIcon from 'feather-icons-react'

export default function DrawerContainer({ isOpen, onClose, toggleRef, children }) {
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement={'left'}
            finalFocusRef={toggleRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton borderRadius={'full'} />

                <DrawerHeader>
                </DrawerHeader>


                <DrawerBody py={0} position={'relative'}>
                    { children }
                </DrawerBody>


                <DrawerFooter>
                    <Button colorScheme={'red'} variant={'ghost'} px={5} size={'sm'}>
                        <HStack width={'full'} alignItems={'center'}>
                            <FeatherIcon size={16} icon={'log-out'} />
                            <Text>Sign Out</Text>
                        </HStack>
                    </Button>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}