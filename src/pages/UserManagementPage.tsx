import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { fetchUsers, deleteUser } from '../features/users/userSlice';
import { User } from '../features/users/types';
import Modal from '../components/common/Modal';
import UserForm from '../features/users/components/UserForm';
import UserList from '../features/users/components/UserList';
import { Plus, Loader, AlertTriangle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagementPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useAppDispatch();
    const { users, isLoading, error } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleCreateNew = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (userId: string) => {
        if (window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
            dispatch(deleteUser(userId));
        }
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const filteredUsers = users.filter(user =>
        (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <motion.div
                className="bg-slate-900 text-white min-h-screen p-8"
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-100">User Management</h1>
                        <button
                            onClick={handleCreateNew}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-lg shadow-blue-600/20 transition-transform transform hover:scale-105"
                        >
                            <Plus size={22} />
                            <span>Add New User</span>
                        </button>
                    </div>

                    <div className="bg-slate-800/80 rounded-xl border border-slate-700 p-6 min-h-[500px]">
                        <AnimatePresence>
                            {isLoading && users.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center h-full text-slate-400 py-16"
                                >
                                    <Loader className="animate-spin h-12 w-12 mb-4" />
                                    <p className="text-lg">Loading Users...</p>
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

                        {!isLoading && !error && (
                             <>
                                <div className="mb-6 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search by name or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>

                                {filteredUsers.length > 0 ? (
                                    <UserList users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-16 text-slate-400"
                                    >
                                        <p className="text-lg font-semibold">No Users Found</p>
                                        {searchTerm && <p>Try adjusting your search criteria.</p>}
                                    </motion.div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingUser ? 'Edit User Details' : 'Create a New User'}>
                <UserForm onClose={closeModal} initialData={editingUser} />
            </Modal>
        </>
    );
};

export default UserManagementPage;
