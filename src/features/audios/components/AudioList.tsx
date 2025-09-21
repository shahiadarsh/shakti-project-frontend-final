import React from 'react';
import { motion } from 'framer-motion';
import { Audio } from '../types';
import { Trash2, PlayCircle } from 'lucide-react';

interface AudioListProps {
    audios: Audio[];
    onDelete: (audioId: string) => void;
    onView: (audio: Audio) => void;
}

const AudioList: React.FC<AudioListProps> = ({ audios, onDelete, onView }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
            <thead>
                <tr className="bg-dark-main">
                    <th className="p-4 font-semibold text-text-secondary">Title</th>
                    <th className="p-4 font-semibold text-text-secondary">Artist</th>
                    <th className="p-4 font-semibold text-text-secondary">Date Added</th>
                    <th className="p-4 font-semibold text-text-secondary text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {audios.map((audio, index) => (
                    <motion.tr key={audio._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-border-color hover:bg-dark-main">
                        <td className="p-4 font-medium text-text-primary">{audio.title}</td>
                        <td className="p-4 text-text-secondary">{audio.artist}</td>
                        <td className="p-4 text-text-secondary">{new Date(audio.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 flex justify-end items-center gap-2">
                            <button onClick={() => onView(audio)} className="p-2 text-text-secondary hover:text-admin-primary"><PlayCircle size={18} /></button>
                            <button onClick={() => onDelete(audio._id)} className="p-2 text-text-secondary hover:text-error-color"><Trash2 size={18} /></button>
                        </td>
                    </motion.tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default AudioList;