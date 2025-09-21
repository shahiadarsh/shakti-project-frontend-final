export interface User {
    _id: string;
    name: string;
    email: string;
    mobileNumber: string;
    role: 'ADMIN' | 'USER';
    subscriptionStatus: 'INACTIVE' | 'ACTIVE' | 'EXPIRED';
    createdAt: string;
}

export type NewUserData = Omit<User, '_id' | 'createdAt' | 'subscriptionStatus'>;
export type UpdateUserData = Partial<NewUserData>;

export interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
}