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
import ThemeToggleButton from '../components/theme-toggle-button';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const submitLogin = (username: string, password: string) => {
        let invalidLoginAlert: string = '';
        invalidLoginAlert += username === '' ? 'Username is required' : '';
        invalidLoginAlert += password === '' ? 'Password is required' : '';
        if (invalidLoginAlert !== '') {
            alert(invalidLoginAlert);
        }
        console.log('username:', username);
        console.log('password:', password);
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
            </Flex>
            <Flex mt={8}>
                <ThemeToggleButton />
            </Flex>
        </Flex>
    );
};

export default Login;
