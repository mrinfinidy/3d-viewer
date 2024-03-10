import React, { Suspense, ChangeEvent, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import { Flex, Box } from '@chakra-ui/react';
import LoadingAnimation from '../components/loading-animation';
import GLBModel from './models/GLBModel';
import OBJModel from './models/OBJModel';
import STLModel from './models/STLModel';
import DefaultModel from './models/DefaultModel';
import ControlPanelLandscape from './ControlPanelLandscape';
import ControlPanelPortrait from './ControlPanelPortrait';
import ThemeToggleButton from '../components/theme-toggle-button';
import useCheckOrientationVertical from '../components/check-screen-orientation';
import BackgroundTogglerButton from '../components/background-toggler-button';
import { Stars } from '@react-three/drei';

const Viewport = () => {

    // Background Toggler
    const [backgroundOn, setBackgroundOn] = React.useState<boolean>(false);
    
    // Use for loading animation
    const { progress } = useProgress();

    // Get and convert file to be passed to Model
    // Get file type
    // Get file name
    const [modelPath, setModelPath] = React.useState<string | null>(null);
    const [modelType, setModelType] = React.useState<string>('');
    const [modelName, setModelName] = React.useState<string | null>('');
    const [modelComponent, setModelComponent] = React.useState<JSX.Element | null>(null);
    const modelInputRef = React.useRef<HTMLInputElement | null>(null);
    // Get texture
    const [texturePath, setTexturePath] = React.useState<string | null>(null);
    const textureInputRef = React.useRef<HTMLInputElement | null>(null);
    // Model dimensions
    interface dimensionsObject {
        width: number;
        height: number;
        depth: number;
    };
    const [modelDimensions, setModelDimensions] = React.useState<dimensionsObject | null>(null);

    const loadModelPath = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setModelPath(URL.createObjectURL(selectedFile));
    
            const fileName = selectedFile.name.split('.').slice(0, -1).join('.');
            setModelName(fileName);
                
            const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
            fileType && setModelType(fileType);
        }        
    };

    const loadTexturePath = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setTexturePath(URL.createObjectURL(selectedFile));
        }
    }

    useEffect(() => {
        if (modelPath) {
            switch (modelType) {
                case 'glb':
                    setModelComponent(<GLBModel modelPath={modelPath} setModelDimensions={setModelDimensions} />);
                    break;
                case 'obj':
                    setModelComponent(<OBJModel modelPath={modelPath} texturePath={texturePath} setModelDimensions={setModelDimensions} />);
                    break;
                case 'stl':
                    setModelComponent(<STLModel modelPath={modelPath} texturePath={texturePath} setModelDimensions={setModelDimensions} />);
                    break;
                default:
                    setModelComponent(<DefaultModel />);
                    setModelName(null);
                    break;
            }
        }
    }, [modelPath, texturePath]);

    const isVertical = useCheckOrientationVertical();

    return (
        <>
            <Canvas
                frameloop='demand'
                camera={{ position: [0, 0, 3] }}
                style={{ width: '100vw', height: '90vh'}}
                
            >
                <Suspense fallback={<LoadingAnimation progress={progress} />}>
                    { backgroundOn &&
                        <Stars
                            radius={80} 
                            depth={50}  
                            count={5000} 
                            factor={4}
                            saturation={0}
                        />
                    }
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
                <ControlPanelPortrait 
                    modelInputRef={modelInputRef}
                    loadModelPath={loadModelPath}
                    textureInputRef={textureInputRef}
                    loadTexturePath={loadTexturePath}
                    modelName={modelName}
                    modelType={modelType}
                    modelDimensions={modelDimensions}
                /> :
                <ControlPanelLandscape
                    modelInputRef={modelInputRef}
                    loadModelPath={loadModelPath}
                    textureInputRef={textureInputRef}
                    loadTexturePath={loadTexturePath}
                    modelName={modelName}
                    modelType={modelType}
                    modelDimensions={modelDimensions}
                /> 
            }
            <Flex
                justify="center"
                align="center"
                direction="row"
            >
                <Box position="absolute" top="5" left="5">
                    <ThemeToggleButton />
                </Box>
                <Box position="absolute" top="5" left="20">
                    <BackgroundTogglerButton backgroundOn={backgroundOn} setBackgroundOn={setBackgroundOn} />
                </Box>
            </Flex>
        </>
    );
};

export default Viewport;
