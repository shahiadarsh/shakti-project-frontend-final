import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { fetchStreams, deleteStream } from '../features/liveStreams/liveStreamSlice';
import Modal from '../components/common/Modal';
import LiveStreamForm from '../features/liveStreams/components/LiveStreamForm';
import LiveStreamList from '../features/liveStreams/components/LiveStreamList';
import { Plus, Loader, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveStreamManagementPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { streams, isLoading, error } = useAppSelector((state) => state.liveStreams);

    useEffect(() => {
        dispatch(fetchStreams());
    }, [dispatch]);

    const handleDelete = (streamId: string) => {
        if (window.confirm('Are you sure you want to delete this scheduled stream?')) {
            dispatch(deleteStream(streamId));
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto"
            >
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold tracking-tight">Live Stream Scheduler</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                        <Plus size={22} />
                        <span>Schedule Stream</span>
                    </button>
                </div>

                <div className="bg-gray-800 shadow-2xl rounded-xl p-6">
                    <AnimatePresence>
                        {isLoading && streams.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-64 text-gray-400"
                            >
                                <Loader className="animate-spin h-12 w-12 mb-4" />
                                <p className="text-lg">Loading streams...</p>
                            </motion.div>
                        )}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center h-64 text-red-400 bg-red-900/20 rounded-lg"
                            >
                                <AlertTriangle className="h-12 w-12 mb-4" />
                                <p className="text-lg font-semibold">An error occurred</p>
                                <p>{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isLoading && !error && (
                        <LiveStreamList streams={streams} onDelete={handleDelete} />
                    )}
                </div>
            </motion.div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule a New Live Stream">
                <LiveStreamForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default LiveStreamManagementPage;