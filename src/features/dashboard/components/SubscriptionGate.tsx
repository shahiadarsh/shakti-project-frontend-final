import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubscriptionGateProps {
    status: 'INACTIVE' | 'EXPIRED';
}

const SubscriptionGate: React.FC<SubscriptionGateProps> = ({ status }) => {
    const title = status === 'INACTIVE' ? "Begin Your Sacred Journey" : "Your Journey Awaits Renewal";
    const description = status === 'INACTIVE' 
        ? "Activate your 10-day spiritual starter pack to unlock the first set of guided practices." 
        : "Your initial access has concluded. Upgrade your subscription to continue your path to enlightenment and unlock all courses.";
    const buttonText = status === 'INACTIVE' ? "Activate for ₹199" : "View Upgrade Plans";

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="card text-center flex flex-col items-center p-8 md:p-12"
        >
            <div className="relative mb-6">
                <Sparkles className="text-brand-accent" size={48} />
                <motion.div 
                    className="absolute inset-0 bg-brand-accent/20 rounded-full -z-10"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{title}</h2>
            <p className="max-w-xl text-text-secondary leading-relaxed mb-8">{description}</p>
            <Link to="/my-account/subscription">
                <button className="btn btn-primary text-lg px-8 py-3 flex items-center gap-2">
                    <span>{buttonText}</span>
                    <ArrowRight size={20} />
                </button>
            </Link>
        </motion.div>
    );
};

export default SubscriptionGate;