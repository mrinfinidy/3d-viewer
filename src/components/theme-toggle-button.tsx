import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ThemeToggleButton = () => {
    const { toggleColorMode } = useColorMode();

    return (
        <AnimatePresence >
            <motion.div
                style={{ display: 'inline-block' }}
                // key={useColorModeValue('light', 'dark')}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
            >
                <IconButton
                  aria-label="Toggle Theme"
                  colorScheme="pink"
                  icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
                  onClick={toggleColorMode as () => void}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default ThemeToggleButton;

