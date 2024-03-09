import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
    modelPath: string;
    setModelDimensions: React.Dispatch<React.SetStateAction<{ width: number; height: number; depth: number } | null>>;
}

const GLBModel: React.FC<ModelProps> = ({ modelPath, setModelDimensions }) => {

    const model = useGLTF(modelPath);
    // Orbit around the center of the model
    const boundingBox = new THREE.Box3().setFromObject(model.scene);
    const boxCenter = new THREE.Vector3();
    boundingBox.getCenter(boxCenter);                                   
    model.scene.position.sub(boxCenter);

    const dimension = {
        width: boundingBox.max.x - boundingBox.min.x,
        height: boundingBox.max.y - boundingBox.min.y,
        depth: boundingBox.max.z - boundingBox.min.z
    };
    setModelDimensions(dimension);

    return (
        <>
            { model.scene && <primitive object={model.scene} /> }
        </>
    );
};

export default GLBModel;

