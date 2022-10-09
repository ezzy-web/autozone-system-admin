import React from 'react'
import { Alert, AlertIcon, Box, AlertTitle, AlertDescription, HStack } from '@chakra-ui/react'

const useFeedback = () => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [heading, setHeading] = React.useState('')
    const [status, setStatus] = React.useState('info')


    const handleOpenAlert = ({ heading, message, status }) => {
        console.log('herhr')
        setIsOpen(true)
        message ? setMessage(message) : setMessage('')
        heading ? setHeading(heading) : setHeading('')
        status ? setStatus(status) : setStatus('info')

        setTimeout(() => {
            setIsOpen(false)
        }, 3000)
    }


    const showSuccess = ({ message, heading }) => {
        handleOpenAlert({ heading, message, status: 'success' })
    }


    const showError = ({ message, heading }) => {
        handleOpenAlert({ heading, message, status: 'error' })
    }





    const render = () => (
        <Box zIndex={'popover'} position={'fixed'} bottom={90} left={90} width={'100%'}> 
            <Alert position={'absolute'} status={status} display={isOpen ? 'unset' : 'none'} borderRadius={2} >
                    <HStack>
                    <AlertIcon />
                    <Box>
                        {heading === '' ? <></> : <AlertTitle fontSize={'sm'}>{heading}</AlertTitle>}
                        {message === '' ? <></> : <AlertDescription fontSize={'sm'}>{message}</AlertDescription>}
                    </Box>
                    </HStack>
                    
            </Alert>
        </Box>
    )


    return {
        showError,
        showSuccess,
        render
    }
}


export default useFeedback