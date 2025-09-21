import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../app/api';
import { DashboardState, StatsData } from './types';

// API se dashboard stats fetch karne ke liye Async Thunk
export const fetchDashboardStats = createAsyncThunk<StatsData, void, { rejectValue: string }>(
    'dashboard/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get<{ stats: StatsData }>('/admin/stats');
            return data.stats;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats.');
        }
    }
);

const initialState: DashboardState = {
    stats: null,
    isLoading: true, // Initially true to show loader on page load
    error: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action: PayloadAction<StatsData>) => {
                state.isLoading = false;
                state.stats = action.payload;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'An unknown error occurred';
            });
    },
});

export default dashboardSlice.reducer;