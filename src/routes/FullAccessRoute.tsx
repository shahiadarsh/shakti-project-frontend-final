import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedHooks';
import Spinner from '../components/common/Spinner';

interface FullAccessRouteProps {
    children: React.ReactNode;
}

const FullAccessRoute: React.FC<FullAccessRouteProps> = ({ children }) => {
    const { status, planType, isLoading } = useAppSelector(state => state.userDashboard);


    if (status === 'ACTIVE' && (planType === 'HALF_YEARLY' || planType === 'ANNUAL')) {
        return <>{children}</>;
    }

    // Agar user ke paas full access nahi hai, to use dashboard par bhej do
    // Dashboard page phir use upgrade karne ke liye prompt karega
    return <Navigate to="/dashboard" replace />;
};

export default FullAccessRoute;