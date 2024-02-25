import React from 'react';
import {
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Switch,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {
    const { toggleColorMode } = useColorMode();
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
                    type="text"
                    variant="filled"
                    mb={3}
                />
                <Input
                    placeholder="********"
                    type="password"
                    variant="filled"
                    mb={6}
                />
                <Button colorScheme="pink" mb={6}>
                    Login
                </Button>
            </Flex>
            <Switch
                id="theme-switch"
                colorScheme="pink"
                size="lg"
                mt={10}
                onChange={toggleColorMode}
            />
        </Flex>
    );
};

export default Login;
