import { motion, AnimatePresence } from 'framer-motion';
import { IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface BackgroundTogglerButtonProps {
    backgroundOn: boolean;
    setBackgroundOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const BackgroundTogglerButton: React.FC<BackgroundTogglerButtonProps> = ({ backgroundOn, setBackgroundOn }) => {

    return (
        <AnimatePresence >
            <motion.div
                // style={{ display: 'inline-block' }}
                key="background-toggler"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
            >
                <IconButton
                    aria-label="Toggle Background"
                    colorScheme="pink"
                    icon={backgroundOn ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setBackgroundOn(!backgroundOn)}
                />
            </motion.div>
        </AnimatePresence>
    )
}

export default BackgroundTogglerButton;
