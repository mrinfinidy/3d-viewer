import { Box, Button, Input, Flex, useColorModeValue, Text } from '@chakra-ui/react'
import FileBrowser from '../components/file-browser';
import TextureLoader from '../components/texture-loader';
import { useEffect, useRef } from 'react';

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

const ControlPanelLandscape: React.FC<ControlPanelProps> = ({ inputRef, loadFilePath, fileName, fileType }) => {

    if (fileName === null) {
        fileName = "Error loading file";
    }

    const textureNeededRef = useRef<boolean>(false);
    if (fileType === "obj" || fileType === "stl") {
        textureNeededRef.current = true;
    } else {
        textureNeededRef.current = false;
    }
    // useEffect(() => {
    //     if (fileType === "obj" || fileType === "stl") {
    //         textureNeededRef.current = true;
    //         } else {
    //             textureNeededRef.current = false;
    //         }
    // }, [fileType]);

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
            border="1px"
            borderColor={useColorModeValue('pink.600', 'pink.200')}
            borderRadius="lg"
            bgColor={useColorModeValue('rgba(234, 234, 234, 0.95)', 'rgba(45, 55, 72, 0.95)')}
            color={useColorModeValue('pink.600', 'pink.200')}
            overflow="scroll"
        >
            <Flex justify="center"
                align="center"
                direction="column"
                my={2}
            >
                <FileBrowser inputRef={inputRef} loadFilePath={loadFilePath} />
                <Text fontSize="sm" colorScheme="gray">
                    *File type must be .glb, .obj, or .stl

                </Text>
                <Text fontSize="md" colorScheme="gray" mt={2}>
                    {fileName}
                </Text>
                <Flex
                    justify="center"
                    align="center"
                    direction="column"
                    mt={2}
                >
                    { textureNeededRef.current && <TextureLoader /> }
                </Flex>
            </Flex>
        </Box>
    )
};

export default ControlPanelLandscape;
