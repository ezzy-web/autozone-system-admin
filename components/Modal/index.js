import { Modal, ModalCloseButton, ModalOverlay, ModalContent, ModalBody, ModalFooter, ModalHeader } from "@chakra-ui/react";


const cardStyle = {
    background: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: 0
}


export default function ModalContainer({ children, isOpen, onClose, toggleRef, size, footer, header, body, wrapper, ...props }) {
    return (
        <>
            <Modal size={size ? size : 'md'} isOpen={isOpen} onClose={onClose} finalFocusRef={toggleRef}  >
                <ModalOverlay />
                <ModalContent as={ wrapper ? wrapper : 'div'} {...cardStyle} >
                    
                    <ModalHeader>{header ? header() : <></>}<ModalCloseButton /></ModalHeader>
                    <ModalBody {...props}>
                        {body ? body() : children}
                    </ModalBody>

                    {footer ? <ModalFooter>{footer()}</ModalFooter> : <></>}

                </ModalContent>
            </Modal>
        </>
    )
}