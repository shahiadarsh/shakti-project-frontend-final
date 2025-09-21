import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedHooks';

interface ProtectedUserRouteProps {
    children: React.ReactNode;
}

const ProtectedUserRoute: React.FC<ProtectedUserRouteProps> = ({ children }) => {
    const { user } = useAppSelector((state) => state.auth);
    const location = useLocation();

    // If there is no user, redirect them to the login page.
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If there is a user, render the requested page (e.g., UserLayout).
    return <>{children}</>;
};

export default ProtectedUserRoute;