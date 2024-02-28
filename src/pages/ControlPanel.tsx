import { Box, Button, Input, Flex, useColorModeValue, Text } from '@chakra-ui/react'
import FileBrowser from '../components/file-browser';

// pink.600 => rbga(233, 30, 99, 1)
// pink.200 => rgba(244, 143, 177, 1)
// bgColor={useColorModeValue('rgba(233, 30, 99, 0.95)', 'rgba(244, 143, 177, 0.95)')}
// gray.200 => rgba(234, 234, 234, 1)
// gray.700 => rgba(28, 28, 28, 1)

const ControlPanel = () => {

    return (
        <Box
            width="20vw"
            height="90vh"
            position="absolute"
            top="50%"
            right="0"
            transform="translateY(-50%)"
            zIndex="2"  // Set a higher zIndex to ensure it appears on top
            p={2}
            mr={4}
            borderRadius="lg"
            bgColor={useColorModeValue('rgba(234, 234, 234, 0.95)', 'rgba(45, 55, 72, 0.95)')}
            color={useColorModeValue('pink.600', 'pink.200')}
        >
            <Flex justify="center"
                align="center"
                direction="column"
                mt={2}
            >
                <FileBrowser />
                <Text fontSize="sm" colorScheme="gray">
                    *File type must be .gltf or .glb
                </Text>
            </Flex>
        </Box>
    )
};

export default ControlPanel;
