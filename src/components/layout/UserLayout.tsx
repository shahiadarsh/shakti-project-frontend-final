import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import UserHeader from './UserHeader';

const UserLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <UserSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            
            <div 
                className={`relative flex flex-col transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'md:ml-64' : 'md:ml-0'
                }`}
            >
                <UserHeader toggleSidebar={toggleSidebar} />
                <main className="flex-grow p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserLayout;