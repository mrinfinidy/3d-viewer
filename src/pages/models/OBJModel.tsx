import React, { useState, useEffect } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

interface ModelProps {
    modelPath: string;
    texturePath: string | null;
    setModelDimensions: React.Dispatch<React.SetStateAction<{ width: number; height: number; depth: number } | null>>;

}

const OBJModel: React.FC<ModelProps> = ({ modelPath, texturePath, setModelDimensions }) => {
    const [model, setModel] = useState<THREE.Object3D | undefined>(undefined);

    useEffect(() => {
        const loader = new OBJLoader();
        loader.load(modelPath, (obj) => {
            // Add texture to model
            let material: any;
            if (texturePath) {
                const texture = new THREE.TextureLoader().load(texturePath);
                material = new THREE.MeshBasicMaterial({ map: texture })
            } else {
                material = new THREE.MeshNormalMaterial();
            }
            obj.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                }
            });
            // Orbit around center of model
            const boundingBox = new THREE.Box3().setFromObject(obj);
            const boxCenter = new THREE.Vector3();
            boundingBox.getCenter(boxCenter);
            obj.position.sub(boxCenter);

            setModel(obj);

            const dimenesions = {
                width: boundingBox.max.x - boundingBox.min.x,
                height: boundingBox.max.y - boundingBox.min.y,
                depth: boundingBox.max.z - boundingBox.min.z,
            };
            setModelDimensions(dimenesions);
        });
    }, [modelPath, texturePath]);


    return (
        <>
            { model && <primitive object={model} /> }
        </>
    );
};

export default OBJModel;
