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
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

import FeatherIcon from 'feather-icons-react'

function NavbarItems({ isDrawer, light }) {

  var style = {
    _hover: {
      bg: "rgba(189, 69, 53, 0.29)",
    },
    borderRadius: "5px",
    px: 4,
    py: 2,
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.25s",
    textColor: "black",
    fontSize: 16
  }

  if (!isDrawer) style['bg'] = 'rgba(68, 68, 68, 0.1)'
  if (light) {
    style['textColor'] = "white"
    style['_hover'] = {
      bg: "rgba(255, 255, 255, 0.096)"
    }
  }


  return (
    <>
      <Link href={"/"}><Box {...style} ><Text  fontSize={'sm'}>Home</Text> </Box></Link>
      <Link href={"/inventory"}><Box {...style} ><Text  fontSize={'sm'}>Inventory</Text></Box></Link>
      <Link href={"about"}><Box {...style} ><Text  fontSize={'sm'}>About Us</Text></Box></Link>
      <Link href={"contact"}><Box {...style} ><Text  fontSize={'sm'}>Contact Us</Text></Box></Link>
    </>
  );
}

function DrawerContainer({ onClose, isOpen }) {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Link href={"/"}>
            <Image src="./assets/image.png" width={10} />
          </Link>
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

function Navbar({ light = false }) {
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
              icon={<FeatherIcon color={light ? 'white' : 'black'} icon={'menu'} />}
            />
            <Stack display={{ base: "none", md: "flex" }}>
              <Link href={"/"}>
                <Image src="./assets/image.png" width={10} />
              </Link>
            </Stack>
          </Stack>
          <HStack spacing={4} alignItems={'center'} justifyContent={'flex-end'}>
            <HStack display={{ base: "none", md: "flex" }} spacing="30px">
              <NavbarItems light={light} />
            </HStack>

            <IconButton variant="ghost" icon={<FeatherIcon size={20} color={light ? 'white' : 'rgb(150, 61, 61)'} fill={light ? 'white' : 'rgb(150, 61, 61)'} icon={'heart'} />} />
          </HStack>

        </Stack>

        <DrawerContainer isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}

export default Navbar;