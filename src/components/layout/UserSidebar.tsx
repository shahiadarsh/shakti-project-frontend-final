import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/typedHooks';
import { logout } from '../../features/auth/authSlice';
import { LayoutDashboard, BookCopy, Radio, User, CreditCard, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import logo from '../../assets/logo.png';

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const navLinks = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', to: '/user/courses', icon: BookCopy },
    { name: 'Live Sessions', to: '/user/live-sessions', icon: Radio },
];

const accountLinks = [
    { name: 'My Profile', to: '/my-account/profile', icon: User },
    { name: 'Subscription', to: '/my-account/subscription', icon: CreditCard },
];

const sidebarVariants: Variants = {
    open: {
        x: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    closed: {
        x: '-100%',
        transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
};

const navListVariants: Variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const navItemVariants: Variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: { y: { stiffness: 1000 } },
    },
};

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <NavLink to={to}>
        {({ isActive }) => (
            <motion.div
                variants={navItemVariants}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center w-full gap-4 p-3 rounded-lg transition-colors
                    ${isActive
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
            >
                {isActive && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                )}
                {children}
            </motion.div>
        )}
    </NavLink>
);


const UserSidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login', { replace: true });
    };

    return (
        <>
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
                        onClick={toggleSidebar}
                    />
                )}
            </AnimatePresence>
            <motion.aside
                variants={sidebarVariants}
                animate={isSidebarOpen ? 'open' : 'closed'}
                initial="closed"
                className="fixed top-0 left-0 z-40 w-64 bg-gradient-to-b from-gray-900 to-black flex flex-col p-4 border-r border-gray-800 h-screen"
            >
                <motion.div variants={navItemVariants} className="flex items-center justify-between mb-10 px-2">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-10 w-10" />
                        <h1 className="text-xl font-bold text-white tracking-wide">Shaktipeeth</h1>
                    </div>
                    <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-white">
                        <X size={24} />
                    </button>
                </motion.div>

                <motion.nav
                    variants={navListVariants}
                    className="flex-grow flex flex-col gap-2"
                >
                    <motion.h3 variants={navItemVariants} className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Main</motion.h3>
                    {navLinks.map(link => (
                        <NavItem to={link.to} key={link.name}>
                            <link.icon size={20} />
                            <span>{link.name}</span>
                        </NavItem>
                    ))}

                    <motion.div variants={navItemVariants} className="my-4 border-t border-gray-800"></motion.div>

                    <motion.h3 variants={navItemVariants} className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Account</motion.h3>
                    {accountLinks.map(link => (
                        <NavItem to={link.to} key={link.name}>
                            <link.icon size={20} />
                            <span>{link.name}</span>
                        </NavItem>
                    ))}
                </motion.nav>

                <motion.div
                    className="mt-auto flex flex-col gap-2 pt-4 border-t border-gray-800"
                >
                    <motion.button
                        variants={navItemVariants}
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        className="flex items-center w-full gap-4 p-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </motion.button>
                </motion.div>
            </motion.aside>
        </>
    );
};

export default UserSidebar;