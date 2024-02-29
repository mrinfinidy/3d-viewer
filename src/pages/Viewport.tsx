import React, { Suspense, ChangeEvent, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import LoadingAnimation from '../components/loading-animation';
import Model from './Model';
import ControlPanel from './ControlPanel';
import ThemeToggleButton from '../components/theme-toggle-button';

const Viewport = () => {
    
    // Use for loading animation
    const { progress } = useProgress();

    // Pass file path to Model component
    const [filePath, setFilePath] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const loadFilePath = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const selectedFilePath = URL.createObjectURL;
            setFilePath(URL.createObjectURL(selectedFile));
        }        
    }

    return (
        <>
            <Canvas
                frameloop='demand'
                camera={{ position: [0, 0, 3] }}
                style={{ width: '100vw', height: '90vh'}}
                
            >
                <Suspense fallback={<LoadingAnimation progress={progress} />}>
                    { filePath && <Model modelPath={filePath} /> }
                    <ambientLight intensity={1} />
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        enableRotate={true}
                    />
                </Suspense>
            </Canvas>
            <ControlPanel inputRef={inputRef} loadFilePath={loadFilePath} />
            <ThemeToggleButton />
        </>
    );
};

export default Viewport;
