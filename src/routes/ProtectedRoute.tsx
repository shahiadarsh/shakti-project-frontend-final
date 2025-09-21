import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedHooks';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // Get the user from the Redux state
    const { user } = useAppSelector((state) => state.auth);
    const location = useLocation();

    // Check if the user is logged in AND if their role is 'ADMIN'
    if (!user || user.role !== 'ADMIN') {
        // If not, redirect them to the admin login page
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // If the user is an authenticated admin, render the child components (e.g., AdminLayout)
    return <>{children}</>;
};

export default ProtectedRoute;