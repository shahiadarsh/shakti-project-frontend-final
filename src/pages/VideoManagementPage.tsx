import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { fetchVideos, deleteVideo } from '../features/videos/videoSlice';
import { Video } from '../features/videos/types';
import Modal from '../components/common/Modal';
import VideoForm from '../features/videos/components/VideoForm';
import VideoList from '../features/videos/components/VideoList';
import { Plus, Loader, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoManagementPage: React.FC = () => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewingVideo, setViewingVideo] = useState<Video | null>(null);

    const dispatch = useAppDispatch();
    const { videos, isLoading, error } = useAppSelector((state) => state.videos);

    useEffect(() => {
        dispatch(fetchVideos());
    }, [dispatch]);

    const handleDelete = (videoId: string) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            dispatch(deleteVideo(videoId));
        }
    };

    const handleView = (video: Video) => {
        setViewingVideo(video);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setViewingVideo(null);
    };

    const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };

    return (
        <>
            <motion.div 
                className="bg-slate-900 text-white min-h-screen p-8"
                // variants={pageVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto">
                    {/* --- HEADER --- */}
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-100">Video Library</h1>
                        <button 
                            onClick={() => setIsFormModalOpen(true)} 
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-lg shadow-blue-600/20 transition-transform transform hover:scale-105"
                        >
                            <Plus size={22} />
                            <span>Add New Video</span>
                        </button>
                    </div>
                    
                    {/* --- CONTENT AREA --- */}
                    <div className="bg-slate-800/80 rounded-xl border border-slate-700 p-6 min-h-[500px]">
                        <AnimatePresence>
                            {isLoading && videos.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center h-full text-slate-400 py-16"
                                >
                                    <Loader className="animate-spin h-12 w-12 mb-4" />
                                    <p className="text-lg">Loading Videos...</p>
                                </motion.div>
                            )}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center h-full text-red-400 bg-red-900/20 rounded-lg py-16"
                                >
                                    <AlertTriangle className="h-12 w-12 mb-4" />
                                    <p className="text-lg font-semibold">An Error Occurred</p>
                                    <p>{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {!isLoading && !error && videos && (
                            <VideoList 
                                videos={videos} 
                                onDelete={handleDelete}
                                onView={handleView}
                            />
                        )}
                    </div>
                </div>
            </motion.div>

            {/* --- MODALS --- */}
            <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title="Add a New Video">
                <VideoForm onClose={() => setIsFormModalOpen(false)} />
            </Modal>

            <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title={viewingVideo?.title || 'Video Preview'}>
                {viewingVideo && (
                    <div className="p-4 bg-black rounded-lg">
                        <video 
                            src={viewingVideo.videoFileUrl} 
                            controls 
                            autoPlay
                            className="w-full h-auto rounded-lg"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default VideoManagementPage;