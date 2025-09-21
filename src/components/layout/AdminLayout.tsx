import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout: React.FC = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-grow admin-scrollbar">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;