import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
    modelPath: string;
}

const GLBModel: React.FC<ModelProps> = ({ modelPath }) => {

    const model = useGLTF(modelPath);
    // Orbit around the center of the model
    const boundingBox = new THREE.Box3().setFromObject(model.scene);
    const boxCenter = new THREE.Vector3();
    boundingBox.getCenter(boxCenter);                                   
    model.scene.position.sub(boxCenter);

    return (
        <>
            { model.scene && <primitive object={model.scene} /> }
        </>
    );
}

export default GLBModel

