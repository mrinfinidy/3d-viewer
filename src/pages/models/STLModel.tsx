import React from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

interface ModelProps {
    modelPath: string;
}

const STLModel: React.FC<ModelProps> = ({ modelPath }) => {
    const loader = new STLLoader();

    const modelRef = React.useRef<THREE.Mesh>();

    loader.load(modelPath, (geometry) => {
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        modelRef.current = mesh;
    });

    return (
        <>
            {modelRef.current && <primitive object={modelRef.current} />}
        </>
    );
}

export default STLModel;
