import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../app/api';
import { AuthState, User } from './types';
import { RootState } from '../../app/store';

interface LoginResponse {
    user: User;
    accessToken: string;
    message: string;
}

interface LoginCredentials {
    name: string;
    email: string;
    mobileNumber: string;
}

const userFromStorage = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') as string) 
    : null;

const tokenFromStorage = localStorage.getItem('token') 
    ? localStorage.getItem('token') 
    : null;

const initialState: AuthState = {
    user: userFromStorage,
    token: tokenFromStorage,
    isLoading: false,
    error: null,
};

export const loginAdmin = createAsyncThunk<
    LoginResponse,
    LoginCredentials,
    { state: RootState, rejectValue: string }
>(
    'auth/loginAdmin',
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await api.post<LoginResponse>('/auth/login', credentials);
            
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.accessToken);
            
            return data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Server responded with an error.');
            } else if (error.request) {
                return rejectWithValue('The server did not respond. Please check if the backend is running.');
            } else {
                return rejectWithValue('An error occurred while setting up the request.');
            }
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
            state.error = null;
        },
        userUpdated: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'An unknown error occurred';
            });
    },
});

export const { logout , userUpdated } = authSlice.actions;
export default authSlice.reducer;
