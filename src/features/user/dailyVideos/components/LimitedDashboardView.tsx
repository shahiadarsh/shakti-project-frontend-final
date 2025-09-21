// src/features/user/userDashboard/components/LimitedDashboardView.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import DailyVideoPlayer from '../../dailyVideos/components/DailyVideoPlayer';

const LimitedDashboardView: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Your Daily Practice</h2>
                <div className="card p-4 sm:p-6">
                    <DailyVideoPlayer /> 
                </div>
            </div>
            
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Unlock Full Potential</h2>
                <div className="card bg-gradient-to-br from-brand-accent/10 to-transparent p-6 text-center flex flex-col justify-center">
                    <p className="text-text-secondary mb-6">Your 10-day free access has begun. Upgrade now to unlock all courses and live sessions.</p>
                    <Link to="/my-account/subscription" className="mt-auto">
                        <button className="btn btn-primary w-full">View Upgrade Plans</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LimitedDashboardView;
