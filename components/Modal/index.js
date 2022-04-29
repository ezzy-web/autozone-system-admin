import { Modal, ModalCloseButton, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";


const cardStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
}


export default function ModalContainer({ children, isOpen, onClose, toggleRef, size }) {
    return (
        <>
        <Modal size={ size ? size : 'md' } isOpen={isOpen} onClose={onClose} finalFocusRef={toggleRef}  >
            <ModalOverlay />
            <ModalContent {...cardStyle} >
                <ModalCloseButton />
                <ModalBody>
                {children}
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}