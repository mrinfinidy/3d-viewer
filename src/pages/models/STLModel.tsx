import React, { useState, useEffect } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

interface ModelProps {
    modelPath: string;
    texturePath: string | null;
}

const STLModel: React.FC<ModelProps> = ({ modelPath, texturePath }) => {
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
        });
    }, [modelPath, texturePath]);

    return (
        <>
            { model && <primitive object={model} />}
        </>
    );
}

export default STLModel;
