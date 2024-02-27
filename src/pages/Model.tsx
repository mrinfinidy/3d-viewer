import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
    modelPath: string;
}

const Model: React.FC<ModelProps> = ({ modelPath }) => {
    const model = useGLTF(modelPath);

    const boundingBox = new THREE.Box3().setFromObject(model.scene);
    // Orbit around the center of the model
    const boxCenter = new THREE.Vector3();
    boundingBox.getCenter(boxCenter);
    model.scene.position.sub(boxCenter);

    return (
        <primitive object={model.scene} />
    );
}

export default Model;
