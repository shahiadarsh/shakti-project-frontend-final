import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { fetchDashboardStats } from '../features/dashboard/dashboardSlice';
import { 
    Users, UserCheck, DollarSign, BookCopy, AlertCircle, 
    ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Enhanced Premium Stat Card component
interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBgColor: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
    title, 
    value, 
    icon, 
    iconBgColor, 
    trend,
    subtitle 
}) => (
    <motion.div 
        className="admin-stat-card group cursor-pointer glow-pulse"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ 
            y: -6, 
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
    >
        {/* Top gradient line - shows on hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-admin-accent-blue via-admin-accent-purple to-admin-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg" />
        
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                        className="admin-icon-container relative overflow-hidden"
                        style={{ backgroundColor: iconBgColor }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div 
                            className="absolute inset-0 opacity-20 rounded-lg"
                            style={{ backgroundColor: iconBgColor }}
                        />
                        {icon}
                        
                        {/* Animated glow effect */}
                        <motion.div
                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30"
                            style={{ 
                                background: `radial-gradient(circle, ${iconBgColor}80, transparent 70%)`
                            }}
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0, 0.3, 0]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                    
                    <div>
                        <p className="admin-caption mb-1 font-semibold uppercase tracking-wider">
                            {title}
                        </p>
                        {trend && (
                            <div className="flex items-center gap-1">
                                <motion.div
                                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
                                        ${trend.isPositive 
                                            ? 'bg-admin-success/10 text-admin-success' 
                                            : 'bg-admin-error/10 text-admin-error'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {trend.isPositive ? (
                                        <ArrowUpRight size={12} />
                                    ) : (
                                        <ArrowDownRight size={12} />
                                    )}
                                    {Math.abs(trend.value)}%
                                </motion.div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="space-y-1">
                    <motion.h3 
                        className="text-4xl font-bold text-admin-primary tracking-tight"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {value}
                    </motion.h3>
                    {subtitle && (
                        <p className="text-sm text-admin-tertiary font-medium">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
            <div className="w-full h-full" style={{ backgroundColor: iconBgColor, borderRadius: '50%' }} />
        </div>
    </motion.div>
);

const DashboardPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { stats, isLoading, error } = useAppSelector((state) => state.dashboard);

    useEffect(() => {
        document.body.classList.add('admin-body');
        dispatch(fetchDashboardStats());
        return () => {
            document.body.classList.remove('admin-body');
        };
    }, [dispatch]);


    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <motion.div
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="w-12 h-12 border-4 border-admin-accent-blue border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-admin-secondary font-medium">Loading Dashboard Stats...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div 
                className="flex flex-col items-center justify-center min-h-screen p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="admin-card p-8 text-center max-w-md">
                    <AlertCircle className="text-admin-error mx-auto mb-4" size={48} />
                    <h2 className="admin-heading-3 mb-2 text-admin-error">Failed to Load Data</h2>
                    <p className="admin-body-text">{error}</p>
                    <motion.button
                        className="admin-button-primary mt-4"
                        onClick={() => dispatch(fetchDashboardStats())}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Retry
                    </motion.button>
                </div>
            </motion.div>
        );
    }
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-8 max-w-7xl mx-auto space-y-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <motion.h1 
                        className="admin-heading-1 mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Dashboard Overview
                    </motion.h1>
                    <motion.p 
                        className="admin-body-text"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Monitor your platform's performance and key metrics
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-right"
                >
                    <p className="text-sm text-admin-tertiary">Last updated</p>
                    <p className="font-semibold text-admin-secondary">
                        {new Date().toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </motion.div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Users" 
                    value={stats?.totalUsers?.toLocaleString('en-IN') ?? 0}
                    subtitle="Registered members"
                    icon={<Users size={24} className="text-white" />}
                    iconBgColor="hsl(var(--admin-accent-blue))"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatCard 
                    title="Active Subscribers" 
                    value={stats?.activeSubscribers?.toLocaleString('en-IN') ?? 0}
                    subtitle="Premium members"
                    icon={<UserCheck size={24} className="text-white" />}
                    iconBgColor="hsl(var(--admin-accent-green))"
                    trend={{ value: 8, isPositive: true }}
                />
                <StatCard 
                    title="Monthly Revenue" 
                    value={`₹${stats?.monthlyRevenue?.toLocaleString('en-IN') ?? 0}`}
                    subtitle="This month's earnings"
                    icon={<DollarSign size={24} className="text-white" />}
                    iconBgColor="hsl(var(--admin-accent-yellow))"
                    trend={{ value: 15, isPositive: true }}
                />
                <StatCard 
                    title="Total Courses" 
                    value={stats?.totalCourses ?? 0}
                    subtitle="Published content"
                    icon={<BookCopy size={24} className="text-white" />}
                    iconBgColor="hsl(var(--admin-accent-purple))"
                    trend={{ value: 3, isPositive: false }}
                />
            </div>

            {/* Other components like graphs can be added here later */}
            
        </motion.div>
    );
};

export default DashboardPage;