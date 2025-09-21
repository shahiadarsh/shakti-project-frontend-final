import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks';
import { fetchUserLiveStreams } from '../../features/user/liveStreams/userLiveStreamsSlice';
import LiveStreamCard from '../../features/user/liveStreams/components/LiveStreamCard';
import LiveStreamCardSkeleton from '../../features/user/liveStreams/components/LiveStreamCardSkeleton';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { AlertCircle, Radio, VideoOff } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

const UserLiveSessionsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { streams, isLoading, error } = useAppSelector(state => state.userLiveStreams);

    useEffect(() => {
        // Only fetch if we don't have data yet and we're not already loading
        if (streams.length === 0 && !isLoading && !error) {
            dispatch(fetchUserLiveStreams());
        }
    }, [dispatch, streams.length, isLoading, error]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, index) => <LiveStreamCardSkeleton key={index} />)}
                </div>
            );
        }
        if (error) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[300px] bg-red-500/5 border border-red-500/20 rounded-xl p-8">
                    <AlertCircle className="h-10 w-10 text-red-400 mb-4" />
                    <p className="text-red-400 text-center font-semibold">Failed to load sessions.</p>
                    <p className="text-red-500/80 text-center text-sm">{error}</p>
                </div>
            );
        }

        const liveStreams = streams.filter(s => s.status === 'LIVE');
        const scheduledStreams = streams.filter(s => s.status === 'SCHEDULED');

        if (streams.length === 0 || (liveStreams.length === 0 && scheduledStreams.length === 0)) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                    <VideoOff className="h-10 w-10 text-gray-500 mb-4" />
                    <p className="text-gray-400 text-center font-semibold">No Active Sessions</p>
                    <p className="text-gray-500 text-center text-sm">There are no live or upcoming sessions right now.</p>
                </div>
            );
        }

        return (
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-12">
                {liveStreams.length > 0 && (
                    <motion.div variants={itemVariants}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <h2 className="text-3xl font-bold text-red-400">Happening Now</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {liveStreams.map(stream => <LiveStreamCard key={stream._id} stream={stream} />)}
                        </div>
                    </motion.div>
                )}
                {scheduledStreams.length > 0 && (
                     <motion.div variants={itemVariants}>
                        <h2 className="text-3xl font-bold text-white mb-6">Upcoming Sessions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {scheduledStreams.map(stream => <LiveStreamCard key={stream._id} stream={stream} />)}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        );
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.div variants={itemVariants} className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    <Radio /> Live Sessions
                </h1>
                <p className="text-gray-400 mt-3 text-lg max-w-3xl">
                    Join our live guided sessions, connect with the community, and deepen your practice in real-time.
                </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default UserLiveSessionsPage;