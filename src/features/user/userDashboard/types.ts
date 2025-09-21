// Yeh user ke subscription status ka structure define karta hai
export interface UserSubscriptionStatus {
    subscriptionStatus: 'INACTIVE' | 'ACTIVE' | 'EXPIRED';
    currentPlan?: {
        planType: 'INITIAL' | 'HALF_YEARLY' | 'ANNUAL';
    };
}

// Yeh naye userDashboard slice ki poori state ka structure define karta hai
export interface UserDashboardState {
    status: UserSubscriptionStatus['subscriptionStatus'] | null;
    planType: UserSubscriptionStatus['currentPlan']['planType'] | null;
    isLoading: boolean;
    error: string | null;
}