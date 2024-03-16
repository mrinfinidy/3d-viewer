import { Box, Button, Input, Flex, useColorModeValue, Text, Image } from '@chakra-ui/react'
import FileBrowser from '../components/file-browser';
import { useEffect, useRef } from 'react';

// pink.600 => rbga(233, 30, 99, 1)
// pink.200 => rgba(244, 143, 177, 1)
// bgColor={useColorModeValue('rgba(233, 30, 99, 0.95)', 'rgba(244, 143, 177, 0.95)')}
// gray.200 => rgba(234, 234, 234, 1)
// gray.700 => rgba(28, 28, 28, 1)

interface ControlPanelProps {
    modelInputRef: React.RefObject<HTMLInputElement>;
    loadModelPath: (event: React.ChangeEvent<HTMLInputElement>) => void;
    textureInputRef: React.RefObject<HTMLInputElement>;
    loadTexturePath: (event: React.ChangeEvent<HTMLInputElement>) => void;
    modelName: string | null;
    modelType: string | null;
    modelDimensions: {
        width: number;
        height: number;
        depth: number;
    } | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const ControlPanelLandscape: React.FC<ControlPanelProps> = ({ 
    modelInputRef,
    loadModelPath,
    textureInputRef,
    loadTexturePath,
    modelName,
    modelType,
    modelDimensions,
    setIsLoggedIn
}) => {

    if (modelName === null) {
        modelName = "Error loading file";
    }

    const textureNeededRef = useRef<boolean>(false);
    if (modelType === "obj" || modelType === "stl") {
        textureNeededRef.current = true;
    } else {
        textureNeededRef.current = false;
    }

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
            bgColor={useColorModeValue('rgba(254, 215, 226, 0.95)', 'rgba(45, 55, 72, 0.95)')}
            color={useColorModeValue('pink.600', 'pink.200')}
            overflow="scroll"
        >
            <Flex justify="center"
                align="center"
                direction="column"
                my={2}
            >
                <FileBrowser 
                    inputRef={modelInputRef}
                    loadFilePath={loadModelPath}
                    acceptedTypes={".glb, .obj, .stl"}
                    buttonText={"Upload 3D Model"} 
                />
                <Text fontSize="sm" colorScheme="gray">
                    *File type must be .glb, .obj, or .stl
                </Text>
                <Text fontSize="md" fontStyle="italic" as="samp" colorScheme="gray" mt={2}>
                    {modelName}
                </Text>
                <Flex
                    justify="center"
                    align="center"
                    direction="column"
                    mt={2}
                >
                    {   textureNeededRef.current && 
                        <FileBrowser
                            inputRef={textureInputRef}
                            loadFilePath={loadTexturePath}
                            acceptedTypes={".png, .jpg, .jpeg"}
                            buttonText={"Load Texture"}
                        />
                    }
                </Flex>
                { modelDimensions &&
                    <Flex
                        justify="center"
                        align="center"
                        direction="column"
                        mt={2}
                    >
                        <Text fontSize="md" colorScheme="gray" as="b" mt={2}>
                            Width:
                        </Text>
                        <Text fontSize="md" colorScheme="gray">
                            { modelDimensions.width } 
                        </Text>
                        <Text fontSize="md" colorScheme="gray" as="b" mt={2}>
                            Height: 
                        </Text>
                        <Text fontSize="md" colorScheme="gray" >
                            { modelDimensions.height }
                        </Text>
                        <Text fontSize="md" colorScheme="gray" as="b" mt={2}>
                            Depth:
                        </Text>
                        <Text fontSize="md" colorScheme="gray" >
                            { modelDimensions.depth }
                        </Text>
                    </Flex>
                }
                <Image
                    src="/box-logo.png"
                    alt="Box Logo"
                    mt={2}
                />
                <Button
                    onClick={() => setIsLoggedIn(false)}
                    mt={2}
                    colorScheme="pink"
                >
                    Log Out
                </Button>
            </Flex>
        </Box>
    )
};

export default ControlPanelLandscape;
