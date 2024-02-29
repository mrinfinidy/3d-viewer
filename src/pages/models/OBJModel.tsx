import React, { useState, useEffect } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

interface ModelProps {
    modelPath: string;
}

const OBJModel: React.FC<ModelProps> = ({ modelPath }) => {
    const [model, setModel] = useState<THREE.Object3D | undefined>(undefined);

    useEffect(() => {
        const loader = new OBJLoader();
        loader.load(modelPath, (obj) => {
            // Orbit around center of model
            const boundingBox = new THREE.Box3().setFromObject(obj);
            const boxCenter = new THREE.Vector3();
            boundingBox.getCenter(boxCenter);
            obj.position.sub(boxCenter);

            setModel(obj);
        });
    }, [modelPath]);


    return (
        <>
            { model && <primitive object={model} /> }
        </>
    );
};

export default OBJModel;
