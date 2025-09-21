import React, { useState, useEffect, FormEvent } from 'react';
import { useAppDispatch } from '../../../hooks/typedHooks';
import { addUser, updateUser } from '../userSlice';
import { User, NewUserData, UpdateUserData } from '../types';

interface UserFormProps {
    onClose: () => void;
    initialData?: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ onClose, initialData }) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
    
    const isEditMode = !!initialData;

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEmail(initialData.email);
            setMobileNumber(initialData.mobileNumber);
            setRole(initialData.role);
        }
    }, [initialData]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (isEditMode && initialData) {
            const userData: UpdateUserData = { name, email, mobileNumber, role };
            dispatch(updateUser({ userId: initialData._id, userData }));
        } else {
            const userData: NewUserData = { name, email, mobileNumber, role };
            dispatch(addUser(userData));
        }
        onClose();
    };

    // --- STYLES FOR A MODERN, POLISHED LOOK ---
    const labelStyle = "block text-sm font-medium text-slate-400 mb-1.5";
    const inputStyle = "w-full bg-slate-900/70 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";
    const disabledInputStyle = "disabled:bg-slate-800/60 disabled:cursor-not-allowed disabled:text-slate-500";

    return (
        // The form container with a sleek background and padding.
        <div className="bg-slate-800 px-8 py-6 rounded-b-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="full-name" className={labelStyle}>Full Name</label>
                    <input
                        id="full-name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={inputStyle}
                        placeholder="e.g., John Doe"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className={labelStyle}>Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={`${inputStyle} ${disabledInputStyle}`}
                        placeholder="e.g., johndoe@example.com"
                        required
                        disabled={isEditMode}
                    />
                </div>
                <div>
                    <label htmlFor="mobile-number" className={labelStyle}>Mobile Number</label>
                    <input
                        id="mobile-number"
                        type="tel"
                        value={mobileNumber}
                        onChange={e => setMobileNumber(e.target.value)}
                        className={inputStyle}
                        placeholder="e.g., +1234567890"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role" className={labelStyle}>Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={e => setRole(e.target.value as 'USER' | 'ADMIN')}
                        className={`${inputStyle} appearance-none`}
                        required
                    >
                        <option value="USER" className="bg-slate-800 text-slate-200">User</option>
                        <option value="ADMIN" className="bg-slate-800 text-slate-200">Admin</option>
                    </select>
                </div>
                <div className="flex justify-end items-center gap-4 pt-5 border-t border-slate-700/60">
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-2.5 px-6 bg-slate-700/60 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/90 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="py-2.5 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-600/20"
                    >
                        {isEditMode ? 'Save Changes' : 'Create User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;