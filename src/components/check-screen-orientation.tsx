import { useEffect, useRef, useState } from 'react';

const useCheckOrientationVertical = () => {
    const [isVertical, setIsVertical] = useState<boolean>(window.innerHeight > window.innerWidth);
    const prevOrientation = useRef<boolean>(window.innerHeight > window.innerWidth);

    useEffect(() => {
        const checkOrientation = () => {
            const currentOrientation = window.innerHeight > window.innerWidth;
            if (prevOrientation.current !== currentOrientation) {
                setIsVertical(currentOrientation);
                prevOrientation.current = currentOrientation;
            }
        };       

        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    return isVertical;
}

export default useCheckOrientationVertical;
