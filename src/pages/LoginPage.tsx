import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { loginAdmin } from '../features/auth/authSlice';
import logo from '../assets/logo.png';
import mandalaPattern from '../assets/mandala-pattern.png';
import { AtSign, Phone, Lock, User as UserIcon } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const { user, isLoading, error } = useAppSelector((state) => state.auth);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginAdmin({ name, email, mobileNumber }));
    };

    useEffect(() => {
        if (user) {
            if (user.role === 'ADMIN') {
                navigate('/admin/dashboard', { replace: true });
            } else if (user.role === 'USER') {
                navigate('/dashboard', { replace: true });
            }
        }
    }, [user, navigate]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-main p-4">
            <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url(${mandalaPattern})`,
                  backgroundSize: '800px 800px',
                  backgroundPosition: 'center',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-bg-dark-main to-bg-dark-main" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-dark-surface border border-border-color rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-80">
                    <div className="text-center mb-8">
                        <motion.img
                            src={logo}
                            alt="Shaktipeeth Portal Logo"
                            className="h-24 w-24 mx-auto mb-4"
                        />
                        <h1 className="text-3xl font-bold text-admin-primary">Shaktipeeth Portal</h1>
                        <p className="text-text-secondary mt-2">Sign in or create your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-3 bg-transparent border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-admin-primary transition-colors"
                                placeholder="Full Name (for new users)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                aria-label="Full Name"
                            />
                        </div>
                        <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-3 bg-transparent border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-admin-primary transition-colors"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-label="Email Address"
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                            <input
                                type="tel"
                                className="w-full pl-10 pr-4 py-3 bg-transparent border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-admin-primary transition-colors"
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                                aria-label="Mobile Number"
                            />
                        </div>

                        {error && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-sm font-medium text-error-color"
                            >
                                {error}
                            </motion.p>
                        )}

                        <div>
                            <button 
                                type="submit" 
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-admin-primary rounded-lg hover:bg-admin-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-admin-primary focus:ring-offset-dark-surface disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <motion.div
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        />
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} />
                                        <span>Continue</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default LoginPage;
