import React from 'react';
import { motion } from 'framer-motion';
import { Video } from '../types';
import { Trash2, PlayCircle } from 'lucide-react';

interface VideoListProps {
    videos?: Video[]; // Make the prop optional
    onDelete: (videoId: string) => void;
    onView: (video: Video) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos = [], onDelete, onView }) => {
    // --- THIS IS THE FIX ---
    // By setting `videos = []` in the function parameters, we guarantee that
    // 'videos' will always be an array, never undefined.

    if (videos.length === 0) {
        return (
            <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-text-primary">No Videos Found</h3>
                <p className="text-text-secondary mt-2">Click "Add New Video" to upload your first video.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
                <thead>
                    <tr className="bg-dark-main">
                        <th className="p-4 font-semibold text-text-secondary">Title</th>
                        <th className="p-4 font-semibold text-text-secondary">Sequence</th>
                        <th className="p-4 font-semibold text-text-secondary">Date Added</th>
                        <th className="p-4 font-semibold text-text-secondary text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map((video, index) => (
                        <motion.tr key={video._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-border-color hover:bg-dark-main">
                            <td className="p-4 font-medium text-text-primary">{video.title}</td>
                            <td className="p-4 text-text-secondary">{video.sequenceOrder}</td>
                            <td className="p-4 text-text-secondary">{new Date(video.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 flex justify-end items-center gap-2">
                                <button onClick={() => onView(video)} className="p-2 text-text-secondary hover:text-admin-primary transition-colors">
                                    <PlayCircle size={18} />
                                </button>
                                <button onClick={() => onDelete(video._id)} className="p-2 text-text-secondary hover:text-error-color transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VideoList;