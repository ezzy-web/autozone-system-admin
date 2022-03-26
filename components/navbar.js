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
  Button,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";

import FeatherIcon from 'feather-icons-react'

function NavbarItems({ isDrawer, light }) {

  var style = {
    _hover: {
      bg: "rgba(189, 69, 53, 0.29)",
    },
    _active: {
      bg: "rgba(189, 69, 53, 0.29)"
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
      <Link passHref href={"/"}><Box {...style} ><Text fontSize={'sm'}>Home</Text> </Box></Link>
      <Link passHref href={"/inventory"}><Box {...style} ><Text fontSize={'sm'}>Inventory</Text></Box></Link>
      <Link passHref href={"/about"}><Box {...style} ><Text fontSize={'sm'}>About Us</Text></Box></Link>
      <Link passHref href={"/contact"}><Box {...style} ><Text fontSize={'sm'}>Contact Us</Text></Box></Link>
    </>
  );
}

function DrawerContainer({ onClose, isOpen }) {
  const socialButton = {
    borderRadius: 'full',
    bgColor: 'red.300',
    color: 'white',
    padding: 2,
    fontSize: 'sm',
    transition: '0.5s',
    _hover: {
      bgColor: 'red.600'
    }
  };
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Link passHref href={"/"}>
            <Image _hover={{ cursor: 'pointer' }} alt={'javvys autozone'} src="/assets/image.png" width={10} />
          </Link>
          <DrawerCloseButton _focus={{boxShadow: 'none', outline: 'none'}} />
        </DrawerHeader>

        <DrawerBody>
          <VStack align={"left"} >
            <NavbarItems isDrawer={true} />
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <HStack>
            <a href="https://www.facebook.com/profile.php?id=100064338601745">
              <Box {...socialButton}>
                <FeatherIcon fill={'white'} icon={"facebook"} />
              </Box>
            </a>
            <a href="https://www.instagram.com/javvys_autozone_limited/">
              <Box {...socialButton}>
                <FeatherIcon icon={"instagram"} />
              </Box>
            </a>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Navbar({ light = false, savedCount }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box py={5} px={{ base: 2, md: 5 }}>
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
                <Image _hover={{ cursor: 'pointer' }} alt={'javvys autonzone'} src="/assets/image.png" width={10} />
              </Link>
            </Stack>
          </Stack>
          <HStack spacing={4} alignItems={'center'} justifyContent={'flex-end'}>
            <HStack display={{ base: "none", md: "flex" }} spacing="30px">
              <NavbarItems light={light} />
            </HStack>

            <Link passHref href={'/saved'}>
              <Button _hover={{ bgColor: 'rgba(255,255,255,0.2)'}} color={ light ? 'white' : 'rgb(150, 61, 61)'} borderRadius={2} fontSize={'xs'} size={'sm'} variant={'ghost'} > Saved Vehicles <Badge colorScheme={'red'} ml={2}>{savedCount ? savedCount : 0}</Badge></Button>
            </Link>

          </HStack>

        </Stack>

        <DrawerContainer isOpen={isOpen} onClose={onClose} />
      </Box>
      {light ? <></> : <Box bg={'linear-gradient(90deg,#9b3e3e,#ff6d1e)'} h={'5px'} width='full' ></Box>}
    </>
  );
}

export default Navbar;