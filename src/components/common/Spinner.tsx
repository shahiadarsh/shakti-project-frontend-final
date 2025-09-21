import React from 'react';
import { motion } from 'framer-motion';

const Spinner: React.FC = () => {
    return (
        <motion.div
            className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            aria-label="Loading..."
        />
    );
};

export default Spinner;