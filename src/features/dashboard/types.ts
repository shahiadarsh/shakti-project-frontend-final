    // Yeh stats object ka structure define karta hai
export interface StatsData {
    totalUsers: number;
    activeSubscribers: number;
    monthlyRevenue: number;
    totalCourses: number;
}

// Yeh dashboard slice ki poori state ka structure define karta hai
export interface DashboardState {
    stats: StatsData | null;
    isLoading: boolean;
    error: string | null;
}

// Defines the data we expect from the `/user/subscriptions/status` endpoint
export interface UserStatus {
    subscriptionStatus: 'INACTIVE' | 'ACTIVE' | 'EXPIRED';
    currentPlan?: {
        planType: 'INITIAL' | 'HALF_YEARLY' | 'ANNUAL';
    };
}

// Defines the state for our new dashboard slice
export interface DashboardState {
    status: UserStatus['subscriptionStatus'] | null;
    planType: UserStatus['currentPlan']['planType'] | null;
    isLoading: boolean;
    error: string | null;
}