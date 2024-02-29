import React from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

interface ModelProps {
    modelPath: string;
}

const OBJModel: React.FC<ModelProps> = ({ modelPath }) => {
    const loader = new OBJLoader();
    const modelRef = React.useRef<THREE.Object3D>();

    console.log('model:', modelRef.current);
    loader.load(modelPath, (obj) => {
        modelRef.current = obj;
    });

    return (
        <>
            {modelRef.current && <primitive object={modelRef.current} />}
        </>
    );
};

export default OBJModel;
