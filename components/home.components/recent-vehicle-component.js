import { Heading, Stack, Box, Image, Text } from "@chakra-ui/react";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

export default function RecentlyVisited({ recents }) {

    TimeAgo.addLocale(en)
    
    const vehicle = recents?.vehicle
    const timeAgo = new TimeAgo('en-US')
    const timeStamp = new Date(recents?.timeStamp)

    const href = `/inventory/vehicle/${vehicle.id}`

    const mainBoxStyle = {
        position: "relative",
        w: "100%",
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
        <a href={href}>
            <Box {...mainBoxStyle}>
                <Box {...imageBoxStyle}>
                    <Image alt={vehicle.title} src={vehicle.images.length === 0 ? "./assets/placeholder.gif" : vehicle.images[0].url} w={"100%"} />
                </Box>
                <Box {...overlayBoxStyle}>

                    <Stack p={"15px"}>
                        <Heading textColor={"white"} size={"md"} >{vehicle.title} { vehicle.isAvailable ? <></> : <Text color={'red.500'} >SOLD</Text>} </Heading>
                        <Text color={'white'} fontSize={'xs'} >{(timeAgo.format(timeStamp).toUpperCase())}</Text>
                    </Stack>
                </Box>
            </Box>
        </a>
    )
}