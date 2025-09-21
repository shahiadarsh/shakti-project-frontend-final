import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedHooks';

interface PublicRouteProps {
    children: React.ReactNode;
}

/**
 * PublicRoute is used for pages that a logged-in user should not see,
 * such as the login or registration page.
 * If the user is logged in, it redirects them to the admin dashboard.
 * Otherwise, it renders the child component.
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { user } = useAppSelector((state) => state.auth);

    if (user && user.role === 'ADMIN') {
        // If the user is logged in as an admin, redirect them away from the public page
        return <Navigate to="/admin/dashboard" replace />;
    }

    // If the user is not logged in, show the requested page (e.g., LoginPage)
    return <>{children}</>;
};

export default PublicRoute;