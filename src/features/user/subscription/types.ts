export interface Plan {
    _id: string;
    planName: string;
    planType: 'INITIAL' | 'HALF_YEARLY' | 'ANNUAL';
    price: number;
    durationInDays: number;
}

export interface RazorpayOrder {
    orderId: string;
    amount: number;
    currency: string;
    key: string; // Razorpay Key ID
}

export interface SubscriptionState {
    availablePlans: Plan[];
    isLoading: boolean;
    error: string | null;
}