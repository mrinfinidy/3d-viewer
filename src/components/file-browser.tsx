import React, { ChangeEvent, useRef } from 'react';
import { Button, Input, useColorModeValue } from '@chakra-ui/react';

const FileBrowser = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
    };
    
    return (
        <>
            <Input
                type="file"
                multiple={false}
                accept=".gltf,.glb"
                bgColor={useColorModeValue('white', 'gray.800')}
                onChange={handleFileChange}
                style={{display: 'none'}}
                ref={inputRef}
            />
            <Button
                onClick={handleButtonClick}
                colorScheme="pink"
                variant="outline"
                marginY={2}
            >
                Upload 3D Model
            </Button>
        </>
    )
}

export default FileBrowser;
