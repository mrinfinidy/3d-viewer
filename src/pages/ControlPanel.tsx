import { Box } from '@chakra-ui/react'

const ControlPanel = () => {
    return (
        <Box
            width="20vw"
            height="94vh"
            position="absolute"
            top="50%"
            right="0"
            transform="translateY(-50%)"
            zIndex="2"  // Set a higher zIndex to ensure it appears on top
            p={2}
            mr={3}
            borderRadius="lg"
            bgColor="rgba(233, 30, 99, 0.5)"
            color="white"
        >
            <p>Control Panel</p>
        </Box>
    )
};

export default ControlPanel;
