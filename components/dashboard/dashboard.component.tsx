import {
  Text,
  Box,
  HStack,
  useDisclosure,
  IconButton,
  useBoolean,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { ApplicationMenu, ArrowLeft, Login, User } from "@icon-park/react";
import { useRef, useEffect } from "react";
import Navigation from "../navigation/nav.component";
import { useRouter } from "next/dist/client/router";
import DrawerContainer from "./drawer-container.component";
import { useAuthContext } from '../../context/user-context/provider.context';

interface DashboardProps {
  page: string;
  children: any;
}

function ProfileMenu() {

  const { profile, signOut } = useAuthContext()

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton as={Button} variant={"ghost"}>
            <HStack alignItems={"center"}>
              <User />
              <Text mx={2} fontWeight={"medium"}>
                {isOpen ? `Hello, ${profile?.first_name}` : `${profile?.first_name} ${profile?.last_name}` }
              </Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <HStack
                fontSize={"sm"}
                spacing={2}
                width={"full"}
                alignItems={"center"}
              >
                <User />
                <Text>Profile</Text>
              </HStack>
            </MenuItem>
            <MenuItem onClick={() => signOut()}>
              <HStack
                fontSize={"sm"}
                spacing={2}
                width={"full"}
                alignItems={"center"}
              >
                <Login />
                <Text>Sign Out</Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

const Dashboard = (props: DashboardProps) => {
  const { page, children } = props;
  const { back } = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerControl = useRef<HTMLButtonElement | null>(null);
  const [loaded, { toggle: toggleLoaded }] = useBoolean(false);

  useEffect(() => toggleLoaded(), []);

  return (
    <Box bg={"whitesmoke"} position={"relative"} minH={"100vh"} pl={0}>
      <DrawerContainer
        isOpen={isOpen}
        onClose={onClose}
        toggleRef={drawerControl}
      >
        <Navigation page={page} />
      </DrawerContainer>

      <HStack
        zIndex={"modal"}
        justifyContent={"end"}
        p={5}
        bgColor={"white"}
        top={0}
        left={0}
        right={0}
        position={"sticky"}
      >
        <IconButton
          display={{ base: "flex", lg: "none" }}
          onClick={onOpen}
          ref={drawerControl}
          ml={5}
          icon={<ApplicationMenu />} aria-label={"Open Drawer"}        />

        <Box display={{ base: "none", lg: "unset" }}>
          {loaded ? <ProfileMenu /> : <></>}
        </Box>
      </HStack>

      <Box
        zIndex={"modal"}
        display={{ base: "none", lg: "unset" }}
        bgColor={"white"}
        position={"fixed"}
        top={0}
        bottom={0}
        left={0}
        pl={5}
        pr={40}
        py={10}
        mr={5}
      >
        <Navigation page={page} />
      </Box>

      <Box
        ml={{ base: "unset", lg: 80 }}
        mt={10}
        pb={10}
        pr={{ base: 1, lg: 5 }}
        pl={{ base: 1, lg: 50 }}
      >
        <HStack spacing={30} px={5}>
          {page === "Dashboard" ? (
            <></>
          ) : (
            <Tooltip label={"Go Back"}>
              <IconButton
                onClick={back}
                colorScheme={"red"}
                variant={"ghost"}
                borderRadius={"full"}
                size={"xl"}
                icon={<ArrowLeft />}
                aria-label={"Go Back"}
              />
            </Tooltip>
          )}

          <Text
            mx={10}
            color={"red.600"}
            fontWeight={"medium"}
            fontSize={"2xl"}
          >
            {page}
          </Text>
        </HStack>
        <Divider my={2} />
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
