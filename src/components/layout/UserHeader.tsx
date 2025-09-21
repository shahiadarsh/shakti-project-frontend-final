import React from 'react';
import { Menu, User, Bell } from 'lucide-react';
import { useAppSelector } from '../../hooks/typedHooks';

interface HeaderProps {
    toggleSidebar: () => void;
}

const UserHeader: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <header className="sticky top-0 z-20 bg-dark-surface/80 backdrop-blur-sm border-b border-border-color">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Mobile menu button */}
                <button 
                    onClick={toggleSidebar} 
                    className="md:hidden text-text-secondary hover:text-text-primary"
                    aria-label="Toggle sidebar"
                >
                    <Menu size={24} />
                </button>
                
                {/* Welcome message on larger screens */}
                <div className="hidden md:block">
                    <h1 className="text-xl font-semibold text-text-primary">
                        Welcome, {user?.name || 'Devotee'}!
                    </h1>
                </div>

                {/* Right side icons and user info */}
                <div className="flex items-center gap-4">
                    <button 
                        className="text-text-secondary hover:text-text-primary"
                        aria-label="Notifications"
                    >
                        <Bell size={20} />
                    </button>
                    <button className="flex items-center gap-2 text-text-secondary hover:text-text-primary">
                        <User size={20} />
                        <span className="hidden sm:inline">{user?.name}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default UserHeader;