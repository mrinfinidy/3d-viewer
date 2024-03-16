import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    // FormControl,
    // FormLabel,
    // Switch,
    useColorModeValue,
} from '@chakra-ui/react';
import MyAlert from '../components/my-alert';
import Registration from '../components/registration';
import ThemeToggleButton from '../components/theme-toggle-button';
import axios from 'axios';

interface LoginProps {
    loginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ loginSuccess }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isMyAlertOpen, setMyAlertOpen] = React.useState(false);
    const [isRegistrationOpen, setRegistrationOpen] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState('');
    const [alertMessage, setAlertMessage] = React.useState('');

    const submitLogin = async (username: string, password: string) => {
        if (!username && !password) {
            setAlertTitle('Error');
            setAlertMessage('Username and password are required');
            setMyAlertOpen(true);
        }

        if (!username && password) {
            setAlertTitle('Error');
            setAlertMessage('Username is required');
            setMyAlertOpen(true);
        }

        if (username && !password) {
            setAlertTitle('Error');
            setAlertMessage('Password is required');
            setMyAlertOpen(true);
        }

        if (username && password) {
            try {
                const response = await axios.post('http://localhost:5000/login', {
                    username,
                    password
                });

                if (response.data === 'ok') {
                    loginSuccess();
                }

                if (response.data === 'fail') {
                    setAlertTitle('Error');
                    setAlertMessage('Invalid username or password');
                    setMyAlertOpen(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const openRegistration = () => {
        setRegistrationOpen(true);
    } 

    const formBackground = useColorModeValue('pink.100', 'gray.700');
    const focusBorderColor = useColorModeValue('pink.600', 'pink.100');

    return (
        <>
        <Flex h="95vh" direction="column" alignItems="center" justifyContent="center">
            <Flex
                direction="column"
                bg={formBackground}
                p={12}
                borderRadius={8}
                boxShadow="lg"
            >
                <Heading mb={6}>Login</Heading>
                <Input
                    placeholder="username"
                    variant="filled"
                    mb={3}
                    focusBorderColor={focusBorderColor}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            submitLogin(username, password);
                        }
                    }}
                >
                </Input>
                <Input
                    placeholder="********"
                    type="password"
                    variant="filled"
                    mb={6}
                    focusBorderColor={focusBorderColor}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            submitLogin(username, password);
                        }
                    }}
                />
                <Button 
                    colorScheme="pink" 
                    mb={6}
                    onClick={() => submitLogin(username, password)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            submitLogin(username, password);
                        }
                    }}       
                >
                    Login
                </Button>
                <Button 
                    colorScheme="pink" 
                    mb={3}
                    onClick={() => openRegistration()}
                >
                    Register
                </Button>
                <Registration
                    isOpen={isRegistrationOpen}
                    onClose={() => setRegistrationOpen(false)}
                />
                <MyAlert
                    title={alertTitle}
                    message={alertMessage}
                    isOpen={isMyAlertOpen}
                    onClose={() => setMyAlertOpen(false)}
                />
            </Flex>
        </Flex>
        <Box position="absolute" top="5" left="5">
            <ThemeToggleButton />
        </Box>

        </>
    );
};

export default Login;
