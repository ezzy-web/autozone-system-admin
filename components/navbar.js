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

function NavbarItems({ isDrawer }) {

  const style = {
    _hover: {
      bg: "rgba(189, 69, 53, 0.29)",
    },
    borderRadius: "10px",
    px: 4,
    py: 2,
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.25s",
    textColor: "black"
  }

  if (! isDrawer) style['bg'] = 'rgba(68, 68, 68, 0.1)'

  return (
    <>
      <Link href={"/"}><div><Box {...style} >Home</Box></div></Link>
      <Link href={"/inventory"}><div><Box {...style} >Inventory</Box></div></Link>      
      <Link href={"about"}><div><Box {...style} >About</Box></div></Link>
      <Link href={"contact"}><div><Box {...style} >Contact</Box></div></Link>
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

function Navbar() {
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
            <NavbarItems />
          </HStack>

          <IconButton variant="ghost" icon={<AiTwotoneHeart />} />
        </Stack>

        <DrawerContainer isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}

export default Navbar;