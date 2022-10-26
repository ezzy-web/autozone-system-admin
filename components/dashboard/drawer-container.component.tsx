import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  HStack,
  Text
} from "@chakra-ui/react";
import { Login } from "@icon-park/react";
import React from "react";
import { useAuthContext } from '../../context/user-context/provider.context';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => any;
  toggleRef: any;
  children: any;
}

function DrawerContainer(props: DrawerProps) {
  const { isOpen, onClose, toggleRef, children } = props;
  const { signOut } = useAuthContext()

  
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement={"left"}
      finalFocusRef={toggleRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton borderRadius={"full"} />

        <DrawerHeader></DrawerHeader>

        <DrawerBody py={0} position={"relative"}>
          {children}
        </DrawerBody>

        <DrawerFooter>
          <Button onClick={() => signOut()} colorScheme={"red"} variant={"ghost"} px={5} size={"sm"}>
            <HStack width={"full"} alignItems={"center"}>
              <Login />
              <Text>Sign Out</Text>
            </HStack>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerContainer;
