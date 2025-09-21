import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Check, Star } from 'lucide-react';

export interface Plan {
    _id: string;
    planName: string;
    price: number;
    planType: 'INITIAL' | 'HALF_YEARLY' | 'ANNUAL';
}

interface PlanCardProps {
    plan: Plan;
    onSelect: (planId: string) => void;
    currentPlanType?: 'INITIAL' | 'HALF_YEARLY' | 'ANNUAL' | null;
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } }
};

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, currentPlanType }) => {
    const isPopular = plan.planType === 'ANNUAL';
    const isInitial = plan.planType === 'INITIAL';
    
    // Check if this plan is the user's current active plan
    const isCurrentPlan = currentPlanType === plan.planType;
    
    // If no current plan, show INITIAL as activated (default)
    // If user has a plan, only show that plan as activated
    const isActivated = isCurrentPlan || (!currentPlanType && isInitial);
    
    
    // Hide lower plans if user has higher plan
    const shouldHide = currentPlanType && (
        (currentPlanType === 'ANNUAL' && (plan.planType === 'INITIAL' || plan.planType === 'HALF_YEARLY')) ||
        (currentPlanType === 'HALF_YEARLY' && plan.planType === 'INITIAL')
    );
    
    // Don't render if this plan should be hidden
    if (shouldHide) {
        return null;
    }

    return (
        <motion.div
            variants={itemVariants}
            whileHover={isActivated ? {} : { y: -10, scale: 1.03 }}
            className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 h-full
                ${isPopular 
                    ? 'bg-gray-900 border-amber-500 shadow-2xl shadow-amber-500/10' 
                    : isInitial
                        ? 'bg-gray-900/50 border-gray-700'
                        : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                }`}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} /> MOST POPULAR
                </div>
            )}
            
            <h3 className="text-2xl font-bold text-white">{plan.planName}</h3>
            <p className="text-gray-400 mt-2 min-h-[40px]">
                {isInitial ? '10-Day Limited Access' : 'Full Access to All Content'}
            </p>

            <div className="my-8">
                <span className="text-5xl font-extrabold text-white">₹{plan.price}</span>
                <span className="text-gray-400 font-medium">
                    /{plan.planType === 'HALF_YEARLY' ? '6 Months' : 'Year'}
                </span>
            </div>

            <ul className="space-y-4 text-gray-300 flex-grow mb-8">
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                    <span>Daily Videos (Initial Plan)</span>
                </li>
                <li className={`flex items-start gap-3 ${isInitial ? 'opacity-40' : ''}`}>
                    <Check className={`h-5 w-5 flex-shrink-0 mt-1 ${isInitial ? 'text-gray-500' : 'text-amber-500'}`} />
                    <span>Full Course Library</span>
                </li>
                 <li className={`flex items-start gap-3 ${isInitial ? 'opacity-40' : ''}`}>
                    <Check className={`h-5 w-5 flex-shrink-0 mt-1 ${isInitial ? 'text-gray-500' : 'text-amber-500'}`} />
                    <span>All Live Sessions</span>
                </li>
            </ul>
            
            <button
                onClick={() => onSelect(plan._id)}
                disabled={isActivated}
                className={`w-full mt-auto py-3 font-semibold rounded-lg transition-colors duration-200
                    ${isActivated
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : isPopular 
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:scale-105 transition-transform' 
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
            >
                {isActivated ? 'Activated Plan' : 'Choose Plan'}
            </button>
        </motion.div>
    );
};

export default PlanCard;
