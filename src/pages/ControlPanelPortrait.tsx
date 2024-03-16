import { Box, Button, Input, Flex, useColorModeValue, Text } from '@chakra-ui/react'
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
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlPanelPortrait: React.FC<ControlPanelProps> = ({
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
                    <FileBrowser
                        inputRef={modelInputRef}
                        loadFilePath={loadModelPath} 
                        acceptedTypes={".glb, .obj, .stl"}
                        buttonText={"Upload 3D Model"}
                    />
                    <Text fontSize="sm" colorScheme="gray">
                        *File type must be .glb, .obj, or .stl
                    </Text>
                    <Text fontSize="md" fontStyle="italic" as="samp" colorScheme="gray">
                        {modelName}
                    </Text>
                </Flex>
                <Flex
                    ml={4}
                    justify="center"
                    align="center"
                    direction="column"
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
                        ml={4}
                        justify="center"
                        align="center"
                        direction="column"
                    >
                        <Flex direction="row" mt="2">
                            <Text fontSize="md" colorScheme="gray" as="b">
                                Width:&nbsp;
                            </Text>
                            <Text fontSize="md" colorScheme="gray">
                                { modelDimensions.width }
                            </Text>
                        </Flex>
                        <Flex direction="row" mt="2">
                            <Text fontSize="md" colorScheme="gray" as="b">
                                Height:&nbsp;
                            </Text>
                            <Text fontSize="md" colorScheme="gray">
                                { modelDimensions.height }
                            </Text>
                        </Flex>
                        <Flex direction="row" mt="2">
                            <Text fontSize="md" colorScheme="gray" as="b">
                                Depth:&nbsp;
                            </Text>
                            <Text fontSize="md" colorScheme="gray">
                                { modelDimensions.depth }
                            </Text>
                        </Flex>
                    </Flex>
                }
                <Flex>

                <Button
                    onClick={() => setIsLoggedIn(false)}
                    ml={2}
                    colorScheme="pink"
                >
                    Log Out
                </Button>
                </Flex>
            </Flex>
        </Box>
    )
};

export default ControlPanelPortrait;

