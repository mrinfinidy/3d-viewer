import React, { ChangeEvent, useRef } from 'react';
import { Button, Input, useColorModeValue } from '@chakra-ui/react';

interface FileBrowserProps {
    inputRef: React.RefObject<HTMLInputElement>;
    loadFilePath: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileBrowser: React.FC<FileBrowserProps> = ({ inputRef, loadFilePath }) => {

    const openFileBrowser = () => {
        inputRef.current?.click();
    }

    return (
        <>
            <Input
                type="file"
                multiple={false}
                accept=".glb, .obj"
                bgColor={useColorModeValue('white', 'gray.800')}
                onChange={loadFilePath}
                style={{display: 'none'}}
                ref={inputRef}
            />
            <Button
                onClick={openFileBrowser}
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
