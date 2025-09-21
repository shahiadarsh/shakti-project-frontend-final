import React from 'react';
// Yahan aap apne CourseList aur LiveStreamList components ko import karenge
// import CourseList from '../../courses/components/CourseList';
// import LiveStreamList from '../../liveStreams/components/LiveStreamList';

const FullDashboardView: React.FC = () => {
    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-bold text-text-primary mb-6">Continue Your Journey</h2>
                <div className="card">
                    {/* <CourseList limit={3} />  <- Example: Show recent courses */}
                    <p className="text-text-secondary p-4">A list of user's recently watched or recommended courses will go here.</p>
                </div>
            </div>
            <div>
                <h2 className="text-3xl font-bold text-text-primary mb-6">Upcoming Live Sessions</h2>
                <div className="card">
                    {/* <LiveStreamList limit={2} /> <- Example: Show upcoming live streams */}
                    <p className="text-text-secondary p-4">Upcoming live sessions will be displayed here.</p>
                </div>
            </div>
        </div>
    );
};

export default FullDashboardView;