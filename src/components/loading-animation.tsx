import { CircularProgress } from "@chakra-ui/react";
import { Html } from "@react-three/drei";

const LoadingAnimation = () => {
    return (
        <Html>
            <CircularProgress isIndeterminate color="green.300" />
        </Html>
    )
}

export default LoadingAnimation
