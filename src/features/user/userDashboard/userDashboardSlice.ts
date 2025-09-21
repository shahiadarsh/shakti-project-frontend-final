import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../app/api';
import { UserDashboardState, UserSubscriptionStatus } from './types';

// Async thunk jo user ka subscription status fetch karega
export const fetchUserStatus = createAsyncThunk<UserSubscriptionStatus, void, { rejectValue: string }>(
    'userDashboard/fetchUserStatus',
    async (_, { rejectWithValue }) => {
        try {
            // Backend endpoint aache se check karein
            const { data } = await api.get<{ subscription: UserSubscriptionStatus }>('/user/subscriptions/status');
            return data.subscription;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user status.');
        }
    }
);

const initialState: UserDashboardState = {
    status: null,
    planType: null,
    isLoading: true,
    error: null,
};

const userDashboardSlice = createSlice({
    name: 'userDashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserStatus.fulfilled, (state, action: PayloadAction<UserSubscriptionStatus>) => {
                state.isLoading = false;
                state.status = action.payload.subscriptionStatus;
                state.planType = action.payload.currentPlan?.planType || null;
            })
            .addCase(fetchUserStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'An unknown error occurred';
            });
    },
});

export default userDashboardSlice.reducer;