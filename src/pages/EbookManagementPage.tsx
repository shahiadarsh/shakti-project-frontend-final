import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { fetchEbooks, deleteEbook } from '../features/ebooks/ebookSlice';
import Modal from '../components/common/Modal';
import EbookForm from '../features/ebooks/components/EbookForm';
import EbookList from '../features/ebooks/components/EbookList';
import { Plus, Loader, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EbookManagementPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { ebooks, isLoading, error } = useAppSelector((state) => state.ebooks);

    useEffect(() => {
        dispatch(fetchEbooks());
    }, [dispatch]);

    const handleDelete = (ebookId: string) => {
        if (window.confirm('Are you sure you want to delete this ebook?')) {
            dispatch(deleteEbook(ebookId));
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
                        <h1 className="text-4xl font-bold tracking-tight text-slate-100">Ebook Library</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-lg shadow-blue-600/20 transition-transform transform hover:scale-105"
                        >
                            <Plus size={22} />
                            <span>Add New Ebook</span>
                        </button>
                    </div>

                    {/* --- CONTENT AREA --- */}
                    <div className="bg-slate-800/80 rounded-xl border border-slate-700 p-6 min-h-[500px]">
                        <AnimatePresence>
                            {isLoading && ebooks.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center h-full text-slate-400 py-16"
                                >
                                    <Loader className="animate-spin h-12 w-12 mb-4" />
                                    <p className="text-lg">Loading Ebooks...</p>
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

                        {!isLoading && !error && ebooks && (
                            <EbookList ebooks={ebooks} onDelete={handleDelete} />
                        )}
                    </div>
                </div>
            </motion.div>

            {/* --- MODAL --- */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add a New Ebook">
                <EbookForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default EbookManagementPage;