import React, { useState, useEffect } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

interface ModelProps {
    modelPath: string;
}

const STLModel: React.FC<ModelProps> = ({ modelPath }) => {
    const [model, setModel] = useState<THREE.Mesh | undefined>();

    useEffect(() => {
        const loader = new STLLoader();
        loader.load(modelPath, (geometry) => {
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const mesh = new THREE.Mesh(geometry, material);
            // Orbit around center of the model
            const boundingBox = new THREE.Box3().setFromObject(mesh);
            const boxCenter = boundingBox.getCenter(new THREE.Vector3());
            mesh.position.sub(boxCenter);
            
            setModel(mesh);
        });
    }, [modelPath]);


    return (
        <>
            { model && <primitive object={model} />}
        </>
    );
}

export default STLModel;
