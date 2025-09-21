import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks';
import { fetchAllPlans, createOrder, verifyPayment } from '../../features/user/subscription/subscriptionSlice';
import Spinner from '../../components/common/Spinner';
import PlanCard from '../../features/user/subscription/components/PlanCard';
import { motion, Variants } from 'framer-motion';
import { Crown } from 'lucide-react';

declare global {
    interface Window {
        Razorpay: any;
    }
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } }
};

const UserSubscriptionPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { availablePlans, isLoading, error } = useAppSelector(state => state.subscription);
    const { status: userStatus, planType, isLoading: isStatusLoading } = useAppSelector(state => state.userDashboard);
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchAllPlans());
    }, [dispatch]);

    const handlePayment = async (planId: string) => {
        if (userStatus === 'ACTIVE') {
            const confirmation = window.confirm("You already have an active subscription. Are you sure you want to purchase a new one? This will override your current plan.");
            if (!confirmation) {
                return;
            }
        }

        const orderResult = await dispatch(createOrder(planId));
        if (createOrder.fulfilled.match(orderResult)) {
            const order = orderResult.payload;
            const selectedPlan = availablePlans.find(p => p._id === planId);

            const options = {
                key: order.key,
                amount: order.amount,
                currency: order.currency,
                name: "Shree Mahavidya Shaktipeeth",
                description: `Payment for ${selectedPlan?.planName}`,
                order_id: order.orderId,
                handler: function (response: any) {
                    dispatch(verifyPayment({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        planId,
                    }));
                },
                prefill: { name: user?.name, email: user?.email },
                theme: { color: "#f59e0b" }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        }
    };

    const renderCurrentStatus = () => {
        if (isStatusLoading) {
            return <div className="flex justify-center mb-12"><Spinner /></div>;
        }
        if (userStatus && userStatus !== 'INACTIVE') {
            return (
                <motion.div
                    variants={itemVariants}
                    className="bg-gray-900/50 backdrop-blur-sm border border-green-500/50 rounded-xl max-w-2xl mx-auto mb-16 p-6 flex flex-col sm:flex-row items-center gap-6"
                >
                    <div className="flex-shrink-0 p-3 bg-green-500/10 rounded-full">
                        <Crown className="h-8 w-8 text-green-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Your Current Subscription</h2>
                        <p className="text-gray-400 mt-1">
                            Status: <span className="font-semibold text-green-400">{userStatus}</span>
                            {planType && ` | Plan: `}
                            {planType && <span className="font-semibold text-white">{planType.replace(/_/g, ' ')}</span>}
                        </p>
                    </div>
                </motion.div>
            );
        }
        return null;
    };

    const renderPlans = () => {
        if (isLoading) {
            return <div className="flex justify-center"><Spinner /></div>;
        }
        if (error) {
            return <p className="text-red-400 text-center">{error}</p>;
        }
        if (availablePlans.length > 0) {
            return (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {availablePlans.map((plan) => (
                        <PlanCard
                            key={plan._id}
                            plan={plan}
                            onSelect={handlePayment}
                            currentPlanType={planType}
                        />
                    ))}
                </motion.div>
            );
        }
        return <p className="text-center text-gray-400">No subscription plans found.</p>;
    };

    return (
        <motion.div initial="hidden" animate="show" variants={containerVariants}>
            <motion.div variants={itemVariants} className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Subscription Plans</h1>
                <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
                    Choose the plan that best fits your spiritual journey.
                </p>
            </motion.div>

            {renderCurrentStatus()}
            
            {renderPlans()}
        </motion.div>
    );
};

export default UserSubscriptionPage;