import React, { useState, useEffect } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

interface ModelProps {
    modelPath: string;
    texturePath: string | null;
    setModelDimensions: React.Dispatch<React.SetStateAction<{ width: number; height: number; depth: number } | null>>;
}

const STLModel: React.FC<ModelProps> = ({ modelPath, texturePath, setModelDimensions }) => {
    const [model, setModel] = useState<THREE.Mesh | undefined>();

    useEffect(() => {
        const loader = new STLLoader();
        loader.load(modelPath, (geometry) => {
            // Add textue to the model
            let material;
            if (texturePath) {
                const texture = new THREE.TextureLoader().load(texturePath);
                material = new THREE.MeshBasicMaterial({ map: texture });
            } else {
                material = new THREE.MeshNormalMaterial();
            }
            const mesh = new THREE.Mesh(geometry, material);
            // Orbit around center of the model
            const boundingBox = new THREE.Box3().setFromObject(mesh);
            const boxCenter = boundingBox.getCenter(new THREE.Vector3());
            mesh.position.sub(boxCenter);

            setModel(mesh);

            const dimensions = {
                width: boundingBox.max.x - boundingBox.min.x,
                height: boundingBox.max.y - boundingBox.min.y,
                depth: boundingBox.max.z - boundingBox.min.z
            };
            setModelDimensions(dimensions);
        });
    }, [modelPath, texturePath]);

    return (
        <>
            { model && <primitive object={model} />}
        </>
    );
}

export default STLModel;
