import React from 'react';
import { motion } from 'framer-motion';
import { Ebook } from '../types';
import { Trash2, ExternalLink } from 'lucide-react';

interface EbookListProps {
    ebooks: Ebook[];
    onDelete: (ebookId: string) => void;
}

const EbookList: React.FC<EbookListProps> = ({ ebooks, onDelete }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
            <thead>
                <tr className="bg-dark-main">
                    <th className="p-4 font-semibold text-text-secondary">Cover</th>
                    <th className="p-4 font-semibold text-text-secondary">Title</th>
                    <th className="p-4 font-semibold text-text-secondary">Author</th>
                    <th className="p-4 font-semibold text-text-secondary text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {ebooks.map((ebook, index) => (
                    <motion.tr key={ebook._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-border-color hover:bg-dark-main">
                        <td className="p-4"><img src={ebook.coverImageUrl} alt={ebook.title} className="w-12 h-16 object-cover rounded" /></td>
                        <td className="p-4 font-medium text-text-primary">{ebook.title}</td>
                        <td className="p-4 text-text-secondary">{ebook.author}</td>
                        <td className="p-4 flex justify-end items-center gap-2">
                            <a href={ebook.ebookFileUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-text-secondary hover:text-admin-primary"><ExternalLink size={18} /></a>
                            <button onClick={() => onDelete(ebook._id)} className="p-2 text-text-secondary hover:text-error-color"><Trash2 size={18} /></button>
                        </td>
                    </motion.tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default EbookList;