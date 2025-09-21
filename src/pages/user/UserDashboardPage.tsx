import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks';
import { fetchUserStatus } from '../../features/user/userDashboard/userDashboardSlice';
import Spinner from '../../components/common/Spinner';
import SubscriptionGate from '../../features/user/userDashboard/components/SubscriptionGate';
import LimitedDashboardView from '../../features/user/userDashboard/components/LimitedDashboardView';
import FullDashboardView from '../../features/user/userDashboard/components/FullDashboardView';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

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
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const contentAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 }
};

const UserDashboardPage: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const { status, planType, isLoading, error } = useAppSelector(state => state.userDashboard);
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchUserStatus());
    }, [dispatch]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <motion.div key="loading" {...contentAnimation} className="flex justify-center items-center min-h-[300px]">
                    <Spinner />
                </motion.div>
            );
        }
        if (error) {
            return (
                <motion.div key="error" {...contentAnimation} className="bg-red-500/10 text-red-400 p-4 rounded-lg flex items-center gap-3">
                    <AlertCircle className="h-5 w-5" />
                    <p>{error}</p>
                </motion.div>
            );
        }

        let componentToRender;
        switch (status) {
            case 'INACTIVE':
            case 'EXPIRED':
                componentToRender = <SubscriptionGate status={status} />;
                break;
            case 'ACTIVE':
                if (planType === 'INITIAL') {
                    componentToRender = <LimitedDashboardView />;
                } else if (planType === 'HALF_YEARLY' || planType === 'ANNUAL') {
                    componentToRender = <FullDashboardView />;
                } else {
                    componentToRender = <p>Welcome! Your dashboard is being prepared.</p>;
                }
                break;
            default:
                componentToRender = <p>Unable to determine your subscription status.</p>;
        }
        
        return (
            <motion.div key={status || 'default'} {...contentAnimation}>
                {componentToRender}
            </motion.div>
        );
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={itemVariants} className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Dashboard
                </h1>
                <p className="text-gray-400 mt-2 text-lg">
                    Welcome back, <span className="font-semibold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">{user?.name || 'Devotee'}</span>. Your spiritual journey continues here.
                </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default UserDashboardPage;