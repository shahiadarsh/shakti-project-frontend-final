import React, { useState, useEffect, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { fetchSettings, updateSettings } from '../features/settings/settingsSlice';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const SettingsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { settings, isLoading } = useAppSelector((state) => state.settings);
    
    const [formData, setFormData] = useState({
        websiteName: '',
        razorpayKeyId: '',
        razorpayKeySecret: '',
    });

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    useEffect(() => {
        if (settings) {
            setFormData({
                websiteName: settings.websiteName || '',
                razorpayKeyId: settings.razorpayKeyId || '',
                razorpayKeySecret: settings.razorpayKeySecret || '',
            });
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateSettings(formData));
        // You might want a more sophisticated notification system than an alert
        alert('Settings have been saved successfully!');
    };

    const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };

    // --- ENHANCED LOADING STATE ---
    if (isLoading && !settings) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900 text-slate-400">
                <div className="flex flex-col items-center">
                    <Loader className="animate-spin h-12 w-12 mb-4" />
                    <p className="text-lg">Loading Settings...</p>
                </div>
            </div>
        );
    }

    // --- STYLES FOR A MODERN, POLISHED LOOK ---
    const labelStyle = "block text-sm font-medium text-slate-400 mb-1.5";
    const inputStyle = "w-full bg-slate-900/70 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";

    return (
        <motion.div
            className="bg-slate-900 text-white min-h-screen p-8"
            // variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-slate-100 mb-10">System Settings</h1>
                
                <div className="bg-slate-800/80 rounded-xl border border-slate-700">
                    <form onSubmit={handleSubmit}>
                        {/* --- GENERAL SETTINGS SECTION --- */}
                        <div className="p-8 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-200 mb-1">General</h3>
                                <p className="text-sm text-slate-400 mb-6">Update your website's basic information.</p>
                            </div>
                            <div>
                                <label htmlFor="websiteName" className={labelStyle}>Website Name</label>
                                <input
                                    id="websiteName"
                                    type="text"
                                    name="websiteName"
                                    value={formData.websiteName}
                                    onChange={handleChange}
                                    className={inputStyle}
                                    placeholder="Your Awesome Website"
                                />
                            </div>
                        </div>

                        <div className="border-t border-slate-700/60"></div>

                        {/* --- PAYMENT GATEWAY SECTION --- */}
                        <div className="p-8 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-200 mb-1">Payment Gateway</h3>
                                <p className="text-sm text-slate-400 mb-6">Configure your Razorpay integration keys.</p>
                            </div>
                            <div>
                                <label htmlFor="razorpayKeyId" className={labelStyle}>Razorpay Key ID</label>
                                <input
                                    id="razorpayKeyId"
                                    type="text"
                                    name="razorpayKeyId"
                                    value={formData.razorpayKeyId}
                                    onChange={handleChange}
                                    className={inputStyle}
                                    placeholder="rzp_live_..."
                                />
                            </div>
                            <div>
                                <label htmlFor="razorpayKeySecret" className={labelStyle}>Razorpay Key Secret</label>
                                <input
                                    id="razorpayKeySecret"
                                    type="password"
                                    name="razorpayKeySecret"
                                    value={formData.razorpayKeySecret}
                                    onChange={handleChange}
                                    className={inputStyle}
                                    placeholder="••••••••••••••••"
                                />
                            </div>
                        </div>

                        {/* --- FORM FOOTER / ACTIONS --- */}
                        <div className="bg-slate-800/50 px-8 py-4 border-t border-slate-700/60 rounded-b-xl flex justify-end">
                            <button
                                type="submit"
                                className="py-2.5 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-600/20"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default SettingsPage;