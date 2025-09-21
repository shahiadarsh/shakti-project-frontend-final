import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/typedHooks';
import { logout } from '../../features/auth/authSlice';
import { 
    LayoutDashboard, BookCopy, Radio, Users, CreditCard, Settings, LogOut, 
    ChevronDown, FolderKanban, Video, Music, BookText, Home, TrendingUp
} from 'lucide-react';
import logo from '../../assets/Home 1.png';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar: React.FC = () => {
    const [isContentOpen, setIsContentOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login', { replace: true });
    };

    // Enhanced nav item component with better styling
    const NavItem: React.FC<{
        to: string;
        icon: React.ReactNode;
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
    }> = ({ to, icon, children, onClick, className = "" }) => (
        <NavLink 
            to={to} 
            onClick={onClick}
            className={({ isActive }) => `
                admin-nav-item group relative
                ${isActive ? 'active bg-admin-surface-elevated border-l-2 border-l-admin-accent-blue' : ''}
                ${className}
            `}
        >
            <div className="flex items-center justify-center w-5 h-5 transition-transform group-hover:scale-110">
                {icon}
            </div>
            <span className="font-medium tracking-wide">{children}</span>
            
            {/* Active indicator glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-admin-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -z-10" />
        </NavLink>
    );

    // Collapsible section component
    const CollapsibleSection: React.FC<{
        title: string;
        icon: React.ReactNode;
        isOpen: boolean;
        onToggle: () => void;
        children: React.ReactNode;
    }> = ({ title, icon, isOpen, onToggle, children }) => (
        <div className="space-y-1">
            <motion.button
                onClick={onToggle}
                className="admin-nav-item w-full justify-between group"
                whileHover={{ backgroundColor: "hsl(var(--admin-sidebar-hover))" }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5 transition-transform group-hover:scale-110">
                        {icon}
                    </div>
                    <span className="font-medium tracking-wide">{title}</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center justify-center w-4 h-4"
                >
                    <ChevronDown size={16} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="ml-6 space-y-1 border-l border-admin-border pl-4"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    // Section header component
    const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
        <div className="px-4 py-3 mt-8 mb-2">
            <h3 className="admin-caption uppercase tracking-widest font-semibold">
                {title}
            </h3>
            <div className="mt-2 h-px bg-gradient-to-r from-admin-border to-transparent" />
        </div>
    );

    return (
        <motion.aside 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-72 bg-admin-sidebar-primary border-r border-admin-border flex flex-col h-screen sticky top-0 admin-scrollbar overflow-y-auto"
            style={{ boxShadow: 'var(--admin-shadow-xl)' }}
        >
            {/* Logo and Brand */}
            <motion.div 
                className="flex items-center gap-4 p-6 mb-2 border-b border-admin-border"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className="relative">
                    <img src={logo} alt="Logo" className="h-10 w-10 rounded-lg" />
                    <div className="absolute inset-0 bg-gradient-to-br from-admin-accent-blue/20 to-admin-accent-purple/20 rounded-lg" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-admin-primary tracking-tight">
                        Admin Panel
                    </h1>
                    <p className="text-xs text-admin-tertiary font-medium">
                        Dashboard Control
                    </p>
                </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-grow px-4 space-y-1">
                {/* Main Dashboard */}
                <div className="mb-4">
                    <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={20} />}>
                        Dashboard
                    </NavItem>
                </div>

                {/* Management Section */}
                <SectionHeader title="Management" />
                <div className="space-y-1">
                    <NavItem to="/admin/courses" icon={<BookCopy size={20} />}>
                        Courses
                    </NavItem>
                    <NavItem to="/admin/livestreams" icon={<Radio size={20} />}>
                        Live Streams
                    </NavItem>
                </div>

                {/* Content Section */}
                <SectionHeader title="Content Library" />
                <CollapsibleSection
                    title="Content Library"
                    icon={<FolderKanban size={20} />}
                    isOpen={isContentOpen}
                    onToggle={() => setIsContentOpen(!isContentOpen)}
                >
                    <NavItem to="/admin/content/videos" icon={<Video size={18} />}>
                        Videos
                    </NavItem>
                    <NavItem to="/admin/content/audios" icon={<Music size={18} />}>
                        Audios
                    </NavItem>
                    <NavItem to="/admin/content/ebooks" icon={<BookText size={18} />}>
                        E-books
                    </NavItem>
                </CollapsibleSection>

                {/* Business Section */}
                <SectionHeader title="Business" />
                <div className="space-y-1">
                    <NavItem to="/admin/users" icon={<Users size={20} />}>
                        Users
                    </NavItem>
                    {/* <NavItem to="/admin/subscriptions" icon={<CreditCard size={20} />}>
                        Subscriptions
                    </NavItem> */}
                    {/* <NavItem to="/admin/analytics" icon={<TrendingUp size={20} />}>
                        Analytics
                    </NavItem> */}
                </div>
            </nav>

            {/* Footer Actions */}
            <div className="p-4 mt-auto border-t border-admin-border space-y-2">
                <NavItem to="/admin/settings" icon={<Settings size={20} />}>
                    Settings
                </NavItem>
                
                <motion.button
                    onClick={handleLogout}
                    className="admin-nav-item w-full text-admin-error hover:bg-admin-error/10 hover:text-admin-error group"
                    whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--admin-error) / 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex items-center justify-center w-5 h-5 transition-transform group-hover:scale-110">
                        <LogOut size={20} />
                    </div>
                    <span className="font-medium tracking-wide">Logout</span>
                </motion.button>

                {/* User info card */}
                <div className="mt-4 p-3 bg-admin-surface rounded-lg border border-admin-border">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-admin-accent-blue to-admin-accent-purple rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">A</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-admin-primary">Admin User</p>
                            <p className="text-xs text-admin-tertiary">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
};


export default Sidebar;
