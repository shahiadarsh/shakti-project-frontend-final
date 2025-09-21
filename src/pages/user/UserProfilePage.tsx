import React, { useState, useEffect, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks';
import { updateUserProfile, clearProfileMessages } from '../../features/user/profile/profileSlice';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { User, Mail, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } }
};

const UserProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);
    const { isUpdating, error, successMessage } = useAppSelector(state => state.profile);

    const [name, setName] = useState(user?.name || '');
    const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || '');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setMobileNumber(user.mobileNumber || '');
        }
        return () => {
            dispatch(clearProfileMessages());
        };
    }, [user, dispatch]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserProfile({ name, mobileNumber }));
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={itemVariants} className="mb-8">
                <h1 className="text-3xl font-bold text-white">My Profile</h1>
                <p className="text-gray-400 mt-1">Manage your personal information and account settings.</p>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl max-w-2xl"
            >
                <form onSubmit={handleSubmit} className="space-y-6 p-8">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                            type="email"
                            value={user?.email || ''}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                            disabled
                        />
                    </div>
                    
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 peer-focus:text-amber-500 transition-colors" />
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your Full Name"
                            className="peer w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 peer-focus:text-amber-500 transition-colors" />
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={e => setMobileNumber(e.target.value)}
                            placeholder="Your Mobile Number"
                            className="peer w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                            required
                        />
                    </div>

                    <AnimatePresence>
                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3 text-green-400 bg-green-500/10 p-3 rounded-lg"
                            >
                                <CheckCircle className="h-5 w-5" />
                                <p>{successMessage}</p>
                            </motion.div>
                        )}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3 text-red-400 bg-red-500/10 p-3 rounded-lg"
                            >
                                <AlertCircle className="h-5 w-5" />
                                <p>{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex justify-end pt-4">
                        <motion.button
                            type="submit"
                            className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isUpdating}
                            whileHover={{ scale: isUpdating ? 1 : 1.05 }}
                            whileTap={{ scale: isUpdating ? 1 : 0.98 }}
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default UserProfilePage;