import React from 'react';
import { Menu, User, Bell } from 'lucide-react';
import { useAppSelector } from '../../hooks/typedHooks';
import { motion } from 'framer-motion';

interface AdminHeaderProps {
    toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <header className="sticky top-0 z-20 bg-admin-sidebar-primary/80 backdrop-blur-sm border-b border-admin-border lg:hidden">
            <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <button 
                    onClick={toggleSidebar} 
                    className="text-admin-secondary hover:text-admin-primary"
                    aria-label="Toggle sidebar"
                >
                    <Menu size={24} />
                </button>
                
                <div className="flex items-center gap-4">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        className="text-admin-secondary hover:text-admin-primary"
                        aria-label="Notifications"
                    >
                        <Bell size={20} />
                    </motion.button>
                    <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 bg-gradient-to-br from-admin-accent-blue to-admin-accent-purple rounded-full flex items-center justify-center"
                    >
                        <span className="text-xs font-bold text-white">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                        </span>
                    </motion.div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
