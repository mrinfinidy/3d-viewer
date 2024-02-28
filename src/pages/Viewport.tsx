import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import LoadingAnimation from '../components/loading-animation';
import Model from './Model';
import ControlPanel from './ControlPanel';
import ThemeToggleButton from '../components/theme-toggle-button';

// interface ViewportProps {
//     model: any;
// }

const Viewport = () => {

    const { active, progress, errors, item, loaded, total } = useProgress();

    // Fix canvas size
    return (
        <>
            <Canvas
                frameloop='demand'
                camera={{ position: [0, 0, 3] }}
                style={{ width: '100vw', height: '90vh'}}
                
            >
                <Suspense fallback={<LoadingAnimation progress={progress} />}>
                    <ambientLight intensity={1} />
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        enableRotate={true}
                    />
                    <Model modelPath='/models/shiba/scene.gltf' />
                </Suspense>
            </Canvas>
            { progress === 100 && <ControlPanel /> }
            { progress == 100 && <ThemeToggleButton />}
        </>
    );
};

export default Viewport;
