import { Button } from '@chakra-ui/react';

const TextureLoader = () => {
    
    return (
        <Button
            colorScheme="pink"
            variant="outline"
            onClick={() => {
                console.log('Load Texture');
            }}
        >
            Load Texture
        </Button>
    );
};

export default TextureLoader;
