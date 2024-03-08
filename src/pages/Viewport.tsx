import React, { Suspense, ChangeEvent, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import LoadingAnimation from '../components/loading-animation';
import GLBModel from './models/GLBModel';
import OBJModel from './models/OBJModel';
import STLModel from './models/STLModel';
import DefaultModel from './models/DefaultModel';
import ControlPanelLandscape from './ControlPanelLandscape';
import ControlPanelPortrait from './ControlPanelPortrait';
import ThemeToggleButton from '../components/theme-toggle-button';
import useCheckOrientationVertical from '../components/check-screen-orientation';

const Viewport = () => {
    
    // Use for loading animation
    const { progress } = useProgress();

    // Get and convert file to be passed to Model
    // Get file type
    // Get file name
    const [filePath, setFilePath] = React.useState<string | null>(null);
    const [fileType, setFileType] = React.useState<string>('');
    const [fileName, setFileName] = React.useState<string | null>('');
    const [modelComponent, setModelComponent] = React.useState<JSX.Element | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const loadFilePath = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFilePath(URL.createObjectURL(selectedFile));
    
            const fileName = selectedFile.name.split('.').slice(0, -1).join('.');
            setFileName(fileName);
                
            const fileType = selectedFile.name.split('.').pop();
            fileType && setFileType(fileType);
        }        
    };

    useEffect(() => {
        if (filePath) {
            switch (fileType) {
                case 'glb':
                case 'GLB':
                    setModelComponent(<GLBModel modelPath={filePath} />);
                    break;
                case 'obj':
                case 'OBJ':
                    setModelComponent(<OBJModel modelPath={filePath} />);
                    break;
                case 'stl':
                case 'STL':
                    setModelComponent(<STLModel modelPath={filePath} />);
                    break;
                default:
                    setModelComponent(<DefaultModel />);
                    setFileName(null);
                    break;
            }
        }
    }, [filePath]);

    const isVertical = useCheckOrientationVertical();

    return (
        <>
            <Canvas
                frameloop='demand'
                camera={{ position: [0, 0, 3] }}
                style={{ width: '100vw', height: '90vh'}}
                
            >
                <Suspense fallback={<LoadingAnimation progress={progress} />}>
                    { modelComponent }
                    <ambientLight intensity={1} />
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        enableRotate={true}
                    />
                </Suspense>
            </Canvas>
            { isVertical ? 
                <ControlPanelPortrait inputRef={inputRef} loadFilePath={loadFilePath} fileName={fileName} fileType={fileType} /> :
                <ControlPanelLandscape inputRef={inputRef} loadFilePath={loadFilePath} fileName={fileName} fileType={fileType} /> 
            }
            <ThemeToggleButton />
        </>
    );
};

export default Viewport;
