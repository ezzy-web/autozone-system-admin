import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Box,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

import { AiOutlineMenu, AiTwotoneHeart } from "react-icons/ai";

function NavbarItems({ isDrawer, light }) {

  var style = {
    _hover: {
      bg: "rgba(189, 69, 53, 0.29)",
    },
    borderRadius: "5px",
    px: 4,
    py: 1,
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.25s",
    textColor: "black"
  }

  if (! isDrawer) style['bg'] = 'rgba(68, 68, 68, 0.1)'
  if (light) {
    style['textColor'] = "white"
    style['_hover'] = {
      bg: "rgba(255, 255, 255, 0.096)"
    }
  }


  return (
    <>
      <Link href={"/"}><Box {...style} >Home</Box></Link>
      <Link href={"/inventory"}><Box {...style} >Inventory</Box></Link>      
      <Link href={"about"}><Box {...style} >About</Box></Link>
      <Link href={"contact"}><Box {...style} >Contact</Box></Link>
    </>
  );
}

function DrawerContainer({ onClose, isOpen }) {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <h1>Autozone</h1>
          <DrawerCloseButton></DrawerCloseButton>
        </DrawerHeader>

        <DrawerBody>
          <VStack align={"left"} >
            <NavbarItems isDrawer={true} />
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          Socials Links
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Navbar({ light=false }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box py={5} px={10}>
        <Stack isInline justify="space-between">
          <Stack align="center" isInline justify="left">
            <IconButton
              onClick={onOpen}
              display={{ base: "flex", md: "none" }}
              variant="ghost"
              icon={<AiOutlineMenu />}
            />
            <Stack display={{ base: "none", md: "flex" }}>
              <h1>
                <Link href={"/"}>Autozone</Link>
              </h1>
            </Stack>
          </Stack>

          <HStack display={{ base: "none", md: "flex" }} spacing="30px">
            <NavbarItems light={light} />
          </HStack>

          <IconButton variant="ghost" icon={<AiTwotoneHeart />} />
        </Stack>

        <DrawerContainer isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}

export default Navbar;