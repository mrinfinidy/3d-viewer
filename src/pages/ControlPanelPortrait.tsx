import { Box, Button, Input, Flex, useColorModeValue, Text } from '@chakra-ui/react'
import FileBrowser from '../components/file-browser';
import { useEffect, useRef } from 'react';
import TextureLoader from '../components/texture-loader';

// pink.600 => rbga(233, 30, 99, 1)
// pink.200 => rgba(244, 143, 177, 1)
// bgColor={useColorModeValue('rgba(233, 30, 99, 0.95)', 'rgba(244, 143, 177, 0.95)')}
// gray.200 => rgba(234, 234, 234, 1)
// gray.700 => rgba(28, 28, 28, 1)

interface ControlPanelProps {
    inputRef: React.RefObject<HTMLInputElement>;
    loadFilePath: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fileName: string | null;
    fileType: string | null;
}

const ControlPanelPortrait: React.FC<ControlPanelProps> = ({ inputRef, loadFilePath, fileName, fileType }) => {

    if (fileName === null) {
        fileName = "Error loading file";
    }

    const textureNeededRef = useRef<boolean>(false);
    if (fileType === "obj" || fileType === "stl") {
        textureNeededRef.current = true;
    } else {
        textureNeededRef.current = false;
    }

    return (
        <Box
            width="90vw"
            height="20vh"
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            bottom="0"
            zIndex="2"  // Set a higher zIndex to ensure it appears on top
            p={2}
            mb={4}
            border="1px"
            borderColor={useColorModeValue('pink.600', 'pink.200')}
            borderRadius="lg"
            bgColor={useColorModeValue('rgba(234, 234, 234, 0.95)', 'rgba(45, 55, 72, 0.95)')}
            color={useColorModeValue('pink.600', 'pink.200')}
            overflow="scroll"
        >
            <Flex 
                justify="left"
                align="center"
                direction="row"
                mx={2}
            >
                <Flex
                    justify="center"
                    align="center"
                    direction="column"
                >
                    <FileBrowser inputRef={inputRef} loadFilePath={loadFilePath} />
                    <Text fontSize="sm" colorScheme="gray">
                        *File type must be .glb, .obj, or .stl
                    </Text>
                    <Text fontSize="md" colorScheme="gray">
                        {fileName}
                    </Text>
                </Flex>
                <Flex
                    ml={4}
                    justify="center"
                    align="center"
                    direction="column"
                >
                    { textureNeededRef.current && <TextureLoader /> }
                </Flex>
            </Flex>
        </Box>
    )
};

export default ControlPanelPortrait;

