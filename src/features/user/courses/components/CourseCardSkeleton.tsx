import React from 'react';

const CourseCardSkeleton: React.FC = () => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-700"></div>
            <div className="p-4 space-y-3">
                <div className="h-3 w-1/3 bg-gray-700 rounded-md"></div>
                <div className="h-4 w-3/4 bg-gray-700 rounded-md"></div>
                <div className="pt-2">
                    <div className="h-1.5 w-full bg-gray-700 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default CourseCardSkeleton;