// src/features/user/userDashboard/components/LimitedDashboardView.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import DailyVideoPlayer from '../../user/dailyVideos/components/DailyVideoPlayer';

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
    >
        <path 
            fillRule="evenodd" 
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" 
            clipRule="evenodd" 
        />
    </svg>
);

const LimitedDashboardView: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-4">Your Daily Practice</h2>
                <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 sm:p-6">
                    <DailyVideoPlayer /> 
                </div>
            </div>
            
            <div className="lg:col-span-1 flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-4">Unlock Full Potential</h2>
                <div className="flex-grow flex flex-col p-6 text-center bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                    <div className="flex-grow flex flex-col items-center justify-center">
                        <StarIcon className="w-12 h-12 text-yellow-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white">
                            Your 10-day free access has begun.
                        </h3>
                        <p className="text-gray-300 mt-2 mb-6">
                            Upgrade now to unlock all courses and live sessions.
                        </p>
                    </div>
                    <Link to="/my-account/subscription" className="w-full mt-auto">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-transform duration-200 ease-in-out hover:scale-105">
                            <span>View Upgrade Plans</span>
                            <span aria-hidden="true">&rarr;</span>
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default LimitedDashboardView;
