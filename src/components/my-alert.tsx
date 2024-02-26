import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from "@chakra-ui/react";

interface MyAlertProps {
    title: string;
    message: string;
    isOpen: boolean;
    onClose: () => void;
}

const MyAlert: React.FC<MyAlertProps> = ({ title, message, isOpen, onClose }) => {
    const { onOpen } = useDisclosure();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>  
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {message}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="pink" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default MyAlert;
