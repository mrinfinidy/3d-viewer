import React from 'react';
import {
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Switch,
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
        loginSuccess();
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

    const formBackground = useColorModeValue('gray.100', 'gray.700');

    return (
        <Flex h="100vh" direction="column" alignItems="center" justifyContent="center">
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
                >
                </Input>
                <Input
                    placeholder="********"
                    type="password"
                    variant="filled"
                    mb={6}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    colorScheme="pink" 
                    mb={6}
                    onClick={() => submitLogin(username, password)}
                >
                    Login
                </Button>
                <MyAlert title={alertTitle} message={alertMessage} isOpen={isMyAlertOpen} onClose={closeModal} />
            </Flex>
            <Flex mt={8}>
                <ThemeToggleButton />
            </Flex>
        </Flex>
    );
};

export default Login;
