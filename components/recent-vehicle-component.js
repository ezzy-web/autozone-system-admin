import { Heading, Stack, Box, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function RecentlyVisited({ vehicle }) {
    const mainBoxStyle = {
        position: "relative",
        w: "350px",
        h: "230px",
        overflow: "hidden",
        my: "10px"
    }

    const imageBoxStyle = {
        overflow: "hidden",
        w: '100%',
        h: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "center"
    }

    const overlayBoxStyle = {
        bg: "rgba(0, 0, 0, 0.534)",
        position: "absolute",
        top: "0",
        w: "100%",
        h: "100%"
    }


    return (
        <Link href={"/"}>
            <Box {...mainBoxStyle}>
                <Box {...imageBoxStyle}>
                    <Image src="./assets/no-image.jpg" w={"100%"} />
                </Box>
                <Box {...overlayBoxStyle}>
                    
                    <Stack p={"15px"}> <Heading textColor={"white"} size={"md"} >{vehicle.name}</Heading> </Stack>
                </Box>
            </Box>
        </Link>
    )
}