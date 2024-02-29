import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface ModelProps {
    modelPath: string;
}

const Model: React.FC<ModelProps> = ({ modelPath }) => {

    const gltfLoader = new GLTFLoader();

    const [model, setModel] = useState<any>({});

    useEffect(() => {
        gltfLoader.load(modelPath, (model) => {
            // Orbit around the center of the model
            const boundingBox = new THREE.Box3().setFromObject(model.scene);
            const boxCenter = new THREE.Vector3();
            boundingBox.getCenter(boxCenter);
            model.scene.position.sub(boxCenter);

            setModel(model);
        }, function(error) {
            URL.revokeObjectURL(modelPath);
        });
    }, [modelPath]);

    return (
        <>
            {model.scene && <primitive object={model.scene} />}
        </>
    );
}

export default Model;
