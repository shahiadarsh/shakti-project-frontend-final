import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubscriptionGateProps {
    status: 'INACTIVE' | 'EXPIRED';
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

const SubscriptionGate: React.FC<SubscriptionGateProps> = ({ status }) => {
    const title = status === 'INACTIVE' ? "Begin Your Sacred Journey" : "Your Journey Awaits Renewal";
    const description = status === 'INACTIVE' 
        ? "Activate your 10-day spiritual starter pack to unlock the first set of guided practices and begin your transformation." 
        : "Your initial access has concluded. Upgrade your subscription to continue your path to enlightenment and unlock all courses.";
    const buttonText = status === 'INACTIVE' ? "Activate for ₹199" : "View Upgrade Plans";

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="bg-gray-900/50 backdrop-blur-lg border border-amber-500/30 rounded-2xl text-center flex flex-col items-center p-8 md:p-12 shadow-2xl shadow-amber-500/10"
        >
            <motion.div variants={itemVariants} className="relative mb-6">
                <div className="p-4 bg-gradient-to-br from-amber-500/20 to-gray-900 rounded-full border border-amber-500/30">
                    <Sparkles className="text-amber-400" size={48} />
                </div>
                <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl -z-10"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
                {title}
            </motion.h2>

            <motion.p variants={itemVariants} className="max-w-xl text-gray-400 leading-relaxed mb-8">
                {description}
            </motion.p>
            
            <motion.div variants={itemVariants}>
                <Link to="/my-account/subscription">
                    <motion.button
                        className="flex items-center gap-2 px-8 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-lg shadow-amber-500/20"
                        whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px rgba(245, 158, 11, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>{buttonText}</span>
                        <ArrowRight size={20} />
                    </motion.button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default SubscriptionGate;