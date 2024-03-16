import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Input,
    FormControl,
    FormHelperText,
    FormErrorMessage,
    useColorModeValue
} from '@chakra-ui/react';
import { useState } from 'react';

interface RegistrationProps {
    isOpen: boolean;
    onClose: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const titleColor = useColorModeValue('pink.600', 'pink.100');

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={titleColor} >Registration</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <RegistrationForm 
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="pink"
                        mr={3}
                        onClick={ () => submitRegistration(username, password, confirmPassword) }
                    >
                        Register
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

interface RegistrationFormProps {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
}) => {
    const focusBorderColor = useColorModeValue('pink.600', 'pink.100');

    const usernameInvalid = username === ''
    const passwordInvalid = password === ''
    const confirmPasswordInvalid = confirmPassword === ''
        
    return (
        <>
            <FormControl isInvalid={usernameInvalid} isRequired>
                {usernameInvalid ? (
                    <FormErrorMessage>
                        Username is required
                    </FormErrorMessage>
                ) : (
                    <FormHelperText>
                        Enter a username
                    </FormHelperText>
                )}
                <Input
                    placeholder="username"
                    variant="filled"
                    mb={3}
                    focusBorderColor={focusBorderColor}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => {
                        submitRegistration(username, password, confirmPassword);
                    }}
                    type="text"
                />  
            </FormControl>
            <FormControl isInvalid={passwordInvalid} isRequired>
                {passwordInvalid ? (
                    <FormErrorMessage>
                        Password is required
                    </FormErrorMessage>
                ) : (
                    <FormHelperText>
                        Enter a password
                    </FormHelperText>
                )}      
                <Input
                    placeholder="password"
                    variant="filled"
                    mb={3}
                    focusBorderColor={focusBorderColor}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => {
                        submitRegistration(username, password, confirmPassword);
                    }}
                />
            </FormControl>
            <FormControl isInvalid={confirmPasswordInvalid} isRequired>
                {confirmPasswordInvalid ? (
                    <FormErrorMessage>
                        Confirm Password is required
                    </FormErrorMessage>
                ) : (
                    <FormHelperText>
                        Confirm your password
                    </FormHelperText>
                )}
                <Input
                    placeholder="confirm password"
                    variant="filled"
                    mb={3}
                    focusBorderColor={focusBorderColor}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={(e) => {
                        submitRegistration(username, password, confirmPassword);
                    }}
                />
            </FormControl>
        </>
    );
};

function submitRegistration (
    username: string,
    password: string,
    confirmPassword: string,
) {
    console.log('register');
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    if (username && password && confirmPassword) {
        if (password === confirmPassword
            && password.length > 0
            && confirmPassword.length > 0) {
            console.log('registration successful');
        } else if (password !== confirmPassword){   
            console.log('passwords do not match');
        }
    } else if (!username || !password || !confirmPassword ) {
        console.log('all fields are required');
    }
}

export default Registration;
