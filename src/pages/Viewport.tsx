import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LoadingAnimation from '../components/loading-animation';
import Model from './Model';

// interface ViewportProps {
//     model: any;
// }

const Viewport = () => {

    return (
        <Canvas
            frameloop='demand'
            camera={{ position: [0, 0, 3] }}
        >
            <Suspense fallback={<LoadingAnimation />}>
                <ambientLight intensity={1} />
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    enableRotate={true}
                />
                <Model modelPath='/models/shiba/scene.gltf' />
            </Suspense>
        </Canvas>
    );
};

export default Viewport;
