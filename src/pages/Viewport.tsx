import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LoadingAnimation from '../components/loading-animation';
import Model from './Model';

// interface ViewportProps {
//     model: any;
// }

const Viewport = () => {
    
    return (
        <div style={{ width: "100vw", height: "100vh" }} >
        <Canvas
            frameloop='demand'
            camera={{ position: [0, 0, 3] }}
        >
                <ambientLight intensity={1} />
                <OrbitControls />
                <Model modelPath='/models/shiba/scene.gltf' />
        </Canvas>
        </div>
    );
};

export default Viewport;
