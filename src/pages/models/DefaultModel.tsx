import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const DefaultModel = () => {
    const model = useGLTF('/models/sad-ghost.glb');
    // Scale the model down
    model.scene.scale.set(0.05, 0.05, 0.05);
    // Orbit around center of the model
    const boundingBox = new THREE.Box3().setFromObject(model.scene);
    const boxCenter = new THREE.Vector3();
    boundingBox.getCenter(boxCenter);
    model.scene.position.sub(boxCenter);

    return(
        <>
            { model.scene && <primitive object={model.scene} /> }
        </>
    );
};

export default DefaultModel;
