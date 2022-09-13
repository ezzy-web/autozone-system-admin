import React from 'react'
import { Alert, AlertIcon, Box, AlertTitle, AlertDescription } from '@chakra-ui/react'

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
        <>
            <Alert zIndex={'popover'} status={status} display={isOpen ? 'flex' : 'none'} borderRadius={2} position={'fixed'} width={'30vw'} bottom={{ base: 90, md: 10 }} right={{ base: 10, md: 90 }} >
                <>
                    <AlertIcon />
                    <Box>
                        {heading === '' ? <></> : <AlertTitle fontSize={'sm'}>{heading}</AlertTitle>}
                        {message === '' ? <></> : <AlertDescription fontSize={'sm'}>{message}</AlertDescription>}
                    </Box>
                </>
            </Alert>
        </>
    )


    return {
        showError,
        showSuccess,
        render
    }
}


export default useFeedback