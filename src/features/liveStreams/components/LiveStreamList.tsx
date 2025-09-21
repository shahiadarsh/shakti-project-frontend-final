import React from 'react';
import { motion } from 'framer-motion';
import { LiveStream } from '../types';
import { Trash2 } from 'lucide-react';

interface LiveStreamListProps {
    streams: LiveStream[];
    onDelete: (streamId: string) => void;
}

const LiveStreamList: React.FC<LiveStreamListProps> = ({ streams, onDelete }) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'SCHEDULED': return 'bg-blue-500/20 text-blue-400';
            case 'LIVE': return 'bg-red-500/20 text-red-400 animate-pulse';
            case 'COMPLETED': return 'bg-gray-500/20 text-gray-400';
            default: return '';
        }
    };
    
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
                <thead>
                    <tr className="bg-dark-main">
                        <th className="p-4 font-semibold text-text-secondary">Title</th>
                        <th className="p-4 font-semibold text-text-secondary">Video</th>
                        <th className="p-4 font-semibold text-text-secondary">Start Time</th>
                        <th className="p-4 font-semibold text-text-secondary">Status</th>
                        <th className="p-4 font-semibold text-text-secondary text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {streams.map((stream, index) => (
                        <motion.tr key={stream._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-border-color">
                            <td className="p-4 font-medium text-text-primary">{stream.title}</td>
                            <td className="p-4 text-text-secondary">{stream.video?.title || 'Deleted Video'}</td>
                            <td className="p-4 text-text-secondary">{new Date(stream.startTime).toLocaleString()}</td>
                            <td className="p-4"><span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(stream.status)}`}>{stream.status}</span></td>
                            <td className="p-4 flex justify-end">
                                <button onClick={() => onDelete(stream._id)} className="p-2 text-text-secondary hover:text-error-color"><Trash2 size={18} /></button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LiveStreamList;