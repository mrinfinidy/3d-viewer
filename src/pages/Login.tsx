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
import ThemeToggleButton from '../components/theme-toggle-button';

interface LoginProps {
    loginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ loginSuccess }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isMyAlertOpen, setMyAlertOpen] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState('');
    const [alertMessage, setAlertMessage] = React.useState('');

    const submitLogin = (username: string, password: string) => {
        // loginSuccess();
        if (username && password) {
            // setAlertTitle('Success');
            // setAlertMessage('Login successful');
            // setMyAlertOpen(true);
            loginSuccess();
        }

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
    }

    const closeModal = () => {
        setMyAlertOpen(false);
    }

    const formBackground = useColorModeValue('pink.100', 'gray.700');

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
                <MyAlert
                    title={alertTitle}
                    message={alertMessage}
                    isOpen={isMyAlertOpen}
                    onClose={closeModal}
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
