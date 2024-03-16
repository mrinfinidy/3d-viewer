import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
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

    const [usernameInvalid, setUsernameInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedUsername = e.target.value;
        setUsername(updatedUsername);
        setUsernameInvalid(updatedUsername === '');
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPassword = e.target.value;
        setPassword(updatedPassword);
        setPasswordInvalid(updatedPassword === '');
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedConfirmPassword = e.target.value;
        setConfirmPassword(updatedConfirmPassword);
        setConfirmPasswordInvalid(updatedConfirmPassword === '' || updatedConfirmPassword !== password);
    }
        
    return (
        <>
            <FormControl isInvalid={usernameInvalid} isRequired>
                {usernameInvalid ? (
                    <FormErrorMessage>
                        Username is required
                    </FormErrorMessage>
                ) : (
                    <FormHelperText>
                        Username
                    </FormHelperText>
                )}
                <Input
                    type="text"
                    placeholder="username"
                    variant="filled"
                    mb={3}
                    focusBorderColor={focusBorderColor}
                    onChange={handleUsernameChange}
                    onKeyPress={(e) => {
                        submitRegistration(username, password, confirmPassword);
                    }}
                />  
            </FormControl>
            <FormControl isInvalid={passwordInvalid} isRequired>
                {passwordInvalid ? (
                    <FormErrorMessage>
                        Password is required
                    </FormErrorMessage>
                ) : (
                    <FormHelperText>
                        Password
                    </FormHelperText>
                )}      
                <Input
                    type="password"
                    placeholder="password"
                    variant="filled"
                    mb={3}
                    focusBorderColor={focusBorderColor}
                    onChange={handlePasswordChange}
                    onKeyPress={(e) => {
                        submitRegistration(username, password, confirmPassword);
                    }}
                />
            </FormControl>
            <FormControl isInvalid={confirmPasswordInvalid} isRequired>
                {confirmPasswordInvalid ? (
                    <FormErrorMessage>
                        Passwords do not match
                    </FormErrorMessage>
                ) : (
                    <FormHelperText>
                        Confirm Password
                    </FormHelperText>
                )}
                <Input
                    type="password"
                    placeholder="confirm password"
                    variant="filled"
                    mb={3}
                    focusBorderColor={focusBorderColor}
                    onChange={handleConfirmPasswordChange}
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
