import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            // Prevent background from scrolling when the modal is open
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    // Added p-4 to ensure modal doesn't touch screen edges
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        // --- FIX APPLIED HERE ---
                        // Added max-h-[90vh] to constrain the modal's height
                        className="bg-slate-800 w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header (no changes needed here) */}
                        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-700">
                            <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
                            <button 
                                onClick={onClose} 
                                className="p-1.5 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-700/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        {/* --- FIX APPLIED HERE --- */}
                        {/* Added flex-1 to make this area fill available space and scroll */}
                        <div className="overflow-y-auto flex-1">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;