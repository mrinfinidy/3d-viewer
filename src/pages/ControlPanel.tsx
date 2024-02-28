import { Box, useColorModeValue } from '@chakra-ui/react'

// pink.600 => rbga(233, 30, 99, 1)
// pink.200 => rgba(244, 143, 177, 1)

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
            mr={3}
            borderRadius="lg"
            bgColor={useColorModeValue('rgba(233, 30, 99, 0.95)', 'rgba(244, 143, 177, 0.95)')}
            color={useColorModeValue('white', 'gray.800')}
        >
            <p>Control Panel</p>
        </Box>
    )
};

export default ControlPanel;
