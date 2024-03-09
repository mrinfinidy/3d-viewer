import React, { ChangeEvent, useRef } from 'react';
import { Button, Input, useColorModeValue } from '@chakra-ui/react';

interface FileBrowserProps {
    inputRef: React.RefObject<HTMLInputElement>;
    loadFilePath: (event: ChangeEvent<HTMLInputElement>) => void;
    acceptedTypes: string,
    buttonText: string
}

const FileBrowser: React.FC<FileBrowserProps> = ({ inputRef, loadFilePath, acceptedTypes, buttonText }) => {

    const openFileBrowser = () => {
        inputRef.current?.click();
    }

    return (
        <>
            <Input
                type="file"
                multiple={false}
                accept={ acceptedTypes }
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
                { buttonText }
            </Button>
        </>
    )
}

export default FileBrowser;
