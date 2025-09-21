// This interface defines the shape of the user object returned by your backend API
export interface User {
    _id: string;
    email: string;
    name: string | null;
    role: 'ADMIN' | 'USER';
    mobileNumber:string;
    // Add any other user properties you might need from the backend
}

// This interface defines the shape of the entire authentication state in Redux
export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}