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
      <Link passHref href={"/"}><Box {...style} ><Text  fontSize={'sm'}>Home</Text> </Box></Link>
      <Link passHref href={"/inventory"}><Box {...style} ><Text  fontSize={'sm'}>Inventory</Text></Box></Link>
      <Link passHref href={"/about"}><Box {...style} ><Text  fontSize={'sm'}>About Us</Text></Box></Link>
      <Link passHref href={"/contact"}><Box {...style} ><Text  fontSize={'sm'}>Contact Us</Text></Box></Link>
    </>
  );
}

function DrawerContainer({ onClose, isOpen }) {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Link passHref href={"/"}>
            <Image _hover={{cursor: 'pointer'}} alt={'javvys autozone'} src="/assets/image.png" width={10} />
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
      <Box py={5} px={{base: 2, md: 5}}>
        <Stack isInline justify="space-between">
          <Stack align="center" isInline justify="left">
            <IconButton
              onClick={onOpen}
              display={{ base: "flex", md: "none" }}
              variant="ghost"
              icon={<FeatherIcon color={light ? 'white' : 'black'} icon={'menu'} />}
            />
            <Stack display={{ base: "none", md: "flex" }}>
              <Link passHref href={"/"}>
                <Image _hover={{cursor: 'pointer'}} alt={'javvys autonzone'} src="/assets/image.png" width={10} />
              </Link>
            </Stack>
          </Stack>
          <HStack spacing={4} alignItems={'center'} justifyContent={'flex-end'}>
            <HStack display={{ base: "none", md: "flex" }} spacing="30px">
              <NavbarItems light={light} />
            </HStack>

            <Link passHref href={'/saved'}>
            <IconButton variant="ghost" icon={<FeatherIcon size={20} color={light ? 'white' : 'rgb(150, 61, 61)'} fill={light ? 'white' : 'rgb(150, 61, 61)'} icon={'heart'} />} />
            </Link>
            
          </HStack>

        </Stack>

        <DrawerContainer isOpen={isOpen} onClose={onClose} />
      </Box>
      { light ? <></> : <Box bg={'linear-gradient(90deg,#9b3e3e,#ff6d1e)'} h={'5px'} width='full' ></Box>}
    </>
  );
}

export default Navbar;