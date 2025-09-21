export interface Plan {
    _id: string;
    planName: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    mobileNumber: string;
    role: 'ADMIN' | 'USER';
    subscriptionStatus: 'INACTIVE' | 'ACTIVE' | 'EXPIRED';
    currentPlan?: Plan;
    createdAt: string;
}

export type NewUserData = Omit<User, '_id' | 'createdAt' | 'subscriptionStatus' | 'currentPlan'>;
export type UpdateUserData = Partial<NewUserData> & {
    currentPlan?: string;
};

export interface UserState {
    users: User[];
    subscriptionPlans: Plan[];
    isLoading: boolean;
    error: string | null;
}
