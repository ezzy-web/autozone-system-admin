import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import {
  DatabaseSearch,
  Dollar,
  Home,
  PaperShip,
  UserBusiness,
} from "@icon-park/react";
import Link from "next/link";
import React from "react";
import { useAuthContext } from '../../context/user-context/provider.context';

interface NavigationProps {
  page: string;
}

export default function Navigation(props: NavigationProps) {
  const { page } = props;
  const { profile } = useAuthContext()
  return (
    <>
      <Box>
        <Text fontWeight={"medium"} fontSize={"sm"}>
          { profile ? `${profile.first_name} ${profile?.last_name}` : ''}
        </Text>
        <Text fontSize={"xs"}>Executive Manager</Text>
        <Badge fontSize={"x-small"}>Administrator</Badge>
      </Box>

      <Box py={5}>
        <Box my={2}>
          <Link  passHref href="/content">
            <a>
              <HStack
                py={2}
                px={5}
                color={page === "Dashboard" ? "red.600" : "unset"}
                fontSize={"sm"}
              >
                <Home />
                <Text fontWeight={"medium"}>Dashboard</Text>
              </HStack>
            </a>
          </Link>
        </Box>

        <Box my={2}>
          <Link  passHref href="/content/inventory">
            <a>
              <HStack
                py={2}
                px={5}
                color={page === "Inventory Manager" ? "red.600" : "unset"}
                fontSize={"sm"}
              >
                <DatabaseSearch />
                <Text fontWeight={"medium"}>Manage Inventory</Text>
              </HStack>
            </a>
          </Link>
        </Box>

        <Box my={2}>
          <Link  passHref href="/content/requests">
            <a>
              <HStack
                py={2}
                px={5}
                color={page === "Client Requests" ? "red.600" : "unset"}
                fontSize={"sm"}
              >
                <PaperShip />
                <Text fontWeight={"medium"}>Client Requests</Text>
              </HStack>
            </a>
          </Link>
        </Box>

        <Box my={2}>
          <Link  passHref href="/content/invoice">
            <a>
              <HStack
                py={2}
                px={5}
                color={page === "Invoice Manager" ? "red.600" : "unset"}
                fontSize={"sm"}
              >
                <Dollar />
                <Text fontWeight={"medium"}>Manage Invoices</Text>
              </HStack>
            </a>
          </Link>
        </Box>

        <Box my={2}>
          <Link  passHref href="/content/admin">
            <a>
              <HStack
                py={2}
                px={5}
                color={page === "User Manager" ? "red.600" : "unset"}
                fontSize={"sm"}
              >
                <UserBusiness />
                <Text fontWeight={"medium"}>Manage Users</Text>
              </HStack>
            </a>
          </Link>
        </Box>
      </Box>
    </>
  );
}
