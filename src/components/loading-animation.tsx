import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Html } from "@react-three/drei";

interface LoadingAnimationProps {
    progress: number
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = (progress ) => {
    return (
        <Html center>
            <CircularProgress isIndeterminate
                color="hotpink"
                size="10rem" 
                thickness="0.2rem"
            >
                <CircularProgressLabel fontSize="1rem" >
                    {progress.progress}%
                </CircularProgressLabel>
            </CircularProgress>

        </Html>
    )
}

export default LoadingAnimation
