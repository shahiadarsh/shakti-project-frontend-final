import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
            <thead>
                <tr className="bg-dark-main">
                    <th className="p-4 font-semibold text-text-secondary">Name</th>
                    <th className="p-4 font-semibold text-text-secondary">Contact</th>
                    <th className="p-4 font-semibold text-text-secondary">Role</th>
                    <th className="p-4 font-semibold text-text-secondary">Subscription</th>
                    <th className="p-4 font-semibold text-text-secondary text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <motion.tr key={user._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-border-color hover:bg-dark-main">
                        <td className="p-4 font-medium text-text-primary">{user.name}</td>
                        <td className="p-4 text-text-secondary text-sm">{user.email}<br/>{user.mobileNumber}</td>
                        <td className="p-4"><span className={`px-3 py-1 text-xs font-semibold rounded-full ${user.role === 'ADMIN' ? 'bg-admin-primary/20 text-admin-primary' : 'bg-gray-500/20 text-gray-400'}`}>{user.role}</span></td>
                        <td className="p-4 text-sm"><span className={`px-3 py-1 text-xs font-semibold rounded-full ${user.subscriptionStatus === 'ACTIVE' ? 'bg-success-color/20 text-success-color' : 'bg-warning-color/20 text-warning-color'}`}>{user.subscriptionStatus}</span></td>
                        <td className="p-4 flex justify-end items-center gap-2">
                            <button onClick={() => onEdit(user)} className="p-2 text-text-secondary hover:text-admin-primary"><Edit size={18} /></button>
                            <button onClick={() => onDelete(user._id)} className="p-2 text-text-secondary hover:text-error-color"><Trash2 size={18} /></button>
                        </td>
                    </motion.tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default UserList;