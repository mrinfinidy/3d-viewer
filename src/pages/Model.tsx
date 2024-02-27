import React from 'react';
import { useGLTF } from '@react-three/drei';

interface ModelProps {
    modelPath: string;
}

const Model: React.FC<ModelProps> = ({ modelPath }) => {
    const model = useGLTF(modelPath);
    return <primitive object={model.scene} />;
}

export default Model;
