import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { fetchAudios, deleteAudio } from '../features/audios/audioSlice';
import { Audio } from '../features/audios/types';
import Modal from '../components/common/Modal';
import AudioForm from '../features/audios/components/AudioForm';
import AudioList from '../features/audios/components/AudioList';
import { Plus, Loader, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioManagementPage: React.FC = () => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [viewingAudio, setViewingAudio] = useState<Audio | null>(null);

    const dispatch = useAppDispatch();
    const { audios, isLoading, error } = useAppSelector((state) => state.audios);

    useEffect(() => {
        dispatch(fetchAudios());
    }, [dispatch]);

    const handleDelete = (audioId: string) => {
        if (window.confirm('Are you sure you want to delete this audio file?')) {
            dispatch(deleteAudio(audioId));
        }
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
                        <h1 className="text-4xl font-bold tracking-tight text-slate-100">Audio Library</h1>
                        <button
                            onClick={() => setIsFormModalOpen(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-lg shadow-blue-600/20 transition-transform transform hover:scale-105"
                        >
                            <Plus size={22} />
                            <span>Add New Audio</span>
                        </button>
                    </div>

                    {/* --- CONTENT AREA --- */}
                    <div className="bg-slate-800/80 rounded-xl border border-slate-700 p-6 min-h-[500px]">
                        <AnimatePresence>
                            {isLoading && audios.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center h-full text-slate-400 py-16"
                                >
                                    <Loader className="animate-spin h-12 w-12 mb-4" />
                                    <p className="text-lg">Loading Audios...</p>
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

                        {!isLoading && !error && audios && (
                            <AudioList audios={audios} onDelete={handleDelete} onView={setViewingAudio} />
                        )}
                    </div>
                </div>
            </motion.div>

            {/* --- MODALS --- */}
            <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title="Add a New Audio">
                <AudioForm onClose={() => setIsFormModalOpen(false)} />
            </Modal>
            
            <Modal isOpen={!!viewingAudio} onClose={() => setViewingAudio(null)} title={viewingAudio?.title || 'Audio Preview'}>
                {viewingAudio && (
                    <div className="p-4 bg-slate-900 rounded-lg">
                        <audio src={viewingAudio.audioFileUrl} controls autoPlay className="w-full rounded-lg" />
                    </div>
                )}
            </Modal>
        </>
    );
};

export default AudioManagementPage;