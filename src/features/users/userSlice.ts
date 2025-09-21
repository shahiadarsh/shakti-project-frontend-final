import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api';
import { User, UserState, NewUserData, UpdateUserData, Plan } from './types';

export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get<{ users: User[] }>('/admin/users');
        return data.users;
    } catch (error: any) { return rejectWithValue('Failed to fetch users.'); }
});

export const fetchSubscriptionPlans = createAsyncThunk('users/fetchPlans', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get<{ plans: Plan[] }>('/admin/subscription-plans');
        return data.plans;
    } catch (error: any) {
        return rejectWithValue('Failed to fetch subscription plans.');
    }
});


export const addUser = createAsyncThunk('users/add', async (userData: NewUserData, { rejectWithValue }) => {
    try {
        const { data } = await api.post<{ user: User }>('/admin/users', userData);
        return data.user;
    } catch (error: any) { return rejectWithValue('Failed to add user.'); }
});

export const updateUser = createAsyncThunk('users/update', async ({ userId, userData }: { userId: string, userData: UpdateUserData }, { rejectWithValue }) => {
    try {
        const { data } = await api.patch<{ user: User }>(`/admin/users/${userId}`, userData);
        return data.user;
    } catch (error: any) { return rejectWithValue('Failed to update user.'); }
});

export const deleteUser = createAsyncThunk('users/delete', async (userId: string, { rejectWithValue }) => {
    try {
        await api.delete(`/admin/users/${userId}`);
        return userId;
    } catch (error: any) { return rejectWithValue('Failed to delete user.'); }
});

const initialState: UserState = {
    users: [],
    subscriptionPlans: [],
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => { state.isLoading = true; })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
                state.subscriptionPlans = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.unshift(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(u => u._id === action.payload._id);
                if (index !== -1) state.users[index] = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(u => u._id !== action.payload);
            });
    },
});

export default userSlice.reducer;
