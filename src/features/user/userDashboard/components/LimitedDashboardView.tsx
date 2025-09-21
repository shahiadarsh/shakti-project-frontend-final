import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { PlayCircle, Sparkles, Crown, Check, ArrowRight } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

const LimitedDashboardView: React.FC = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
            <motion.div variants={itemVariants} className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <PlayCircle className="text-amber-400" />
                    Your Daily Practice
                </h2>
                <motion.div
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="group relative aspect-video bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl flex items-center justify-center p-4 cursor-pointer overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                    <div className="text-center z-20">
                        <div className="p-4 bg-white/10 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                            <PlayCircle size={64} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mt-4">Today's Sacred Guidance</h3>
                        <p className="text-gray-400">15 min</p>
                    </div>
                </motion.div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="text-amber-400" />
                    Unlock Full Potential
                </h2>
                <div className="flex-grow flex flex-col bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 rounded-xl p-6 text-center">
                    <div className="mx-auto p-3 bg-amber-500/10 rounded-full mb-4">
                        <Crown className="h-8 w-8 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Elevate Your Journey</h3>
                    <p className="text-gray-400 mt-2 mb-6 flex-grow">
                        Upgrade to unlock all premium features and content.
                    </p>
                    <ul className="space-y-2 text-left text-gray-300 mb-6">
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-400" /> Full Course Library
                        </li>
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-400" /> All Live Sessions
                        </li>
                    </ul>
                    <Link to="/my-account/subscription">
                        <motion.button
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-lg shadow-amber-500/20"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>View Upgrade Plans</span>
                            <ArrowRight size={18} />
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LimitedDashboardView;