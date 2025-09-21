import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { loginAdmin } from '../features/auth/authSlice';
import logo from "@/assets/Home 1.png";
import mandalaPattern from '../assets/mandala-pattern.png';
import { AtSign, Phone, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const { user, isLoading, error } = useAppSelector((state) => state.auth);

    // Validation functions
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobile = (mobile: string) => {
        const mobileRegex = /^[6-9]\d{9}$/;
        return mobileRegex.test(mobile);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (value && !validateEmail(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        setMobileNumber(value);
        if (value && !validateMobile(value)) {
            setMobileError('Please enter a valid 10-digit mobile number starting with 6-9');
        } else {
            setMobileError('');
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Clear previous errors
        setEmailError('');
        setMobileError('');
        
        // Validate inputs
        let hasError = false;
        
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            hasError = true;
        }
        
        if (!validateMobile(mobileNumber)) {
            setMobileError('Please enter a valid 10-digit mobile number starting with 6-9');
            hasError = true;
        }
        
        if (hasError) {
            return;
        }
        
        dispatch(loginAdmin({ email, mobileNumber }));
    };

    useEffect(() => {
        if (user) {
            if (user.role === 'ADMIN') {
                navigate('/admin/dashboard', { replace: true });
            } else if (user.role === 'USER') {
                navigate('/dashboard', { replace: true });
            } else {
                console.error("Unknown user role:", user.role);
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
                        <p className="text-text-secondary mt-2">Sign in to continue your journey.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                            <input
                                type="email"
                                className={`w-full pl-10 pr-4 py-3 bg-transparent border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 transition-colors ${
                                    emailError ? 'border-error-color focus:ring-error-color' : 'border-border-color focus:ring-admin-primary'
                                }`}
                                placeholder="Email Address"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                aria-label="Email Address"
                            />
                            {emailError && (
                                <motion.p 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-error-color text-xs mt-1"
                                >
                                    {emailError}
                                </motion.p>
                            )}
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                            <input
                                type="tel"
                                className={`w-full pl-10 pr-4 py-3 bg-transparent border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 transition-colors ${
                                    mobileError ? 'border-error-color focus:ring-error-color' : 'border-border-color focus:ring-admin-primary'
                                }`}
                                placeholder="Mobile Number (10 digits)"
                                value={mobileNumber}
                                onChange={handleMobileChange}
                                maxLength={10}
                                required
                                aria-label="Mobile Number"
                            />
                            {mobileError && (
                                <motion.p 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-error-color text-xs mt-1"
                                >
                                    {mobileError}
                                </motion.p>
                            )}
                        </div>

                        {/* <div className="text-right">
                            <Link to="/forgot-password" className="text-sm font-medium text-admin-primary hover:underline">
                                Forgot Details?
                            </Link>
                        </div> */}

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
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 " 
                                
                            >
                                {isLoading ? (
                                    <>
                                        <motion.div
                                            className="w-5 h-5 rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        />
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2 border border-white rounded-lg px-4 py-2">
                                        <Lock size={18} />
                                        <span>Sign In</span>
                                    </div>
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
