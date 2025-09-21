import React from 'react';
import { Link } from 'react-router-dom';
// Yahan par aap apne daily video component (e.g., DailyVideoPlayer) ko import karenge
// import DailyVideoPlayer from './DailyVideoPlayer'; 

const LimitedDashboardView: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Daily Video */}
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Your Daily Practice</h2>
                <div className="card aspect-video flex items-center justify-center">
                    {/* <DailyVideoPlayer /> */}
                    <p className="text-text-secondary">Daily Video Player Component Goes Here</p>
                </div>
            </div>
            
            {/* Right side - Upgrade Prompt */}
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Unlock Full Potential</h2>
                <div className="card bg-gradient-to-br from-brand-accent/10 to-transparent p-6 text-center">
                    <p className="text-text-secondary mb-4">Your initial journey has begun. Upgrade to unlock all courses, live sessions, and our complete content library.</p>
                    <Link to="/my-account/subscription">
                        <button className="btn btn-primary w-full">View Upgrade Plans</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LimitedDashboardView;