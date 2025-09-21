// src/features/user/dailyVideos/dailyVideoSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../app/api';
import { DailyVideo, DailyVideoState } from './types';

interface FetchResponse {
    videos: DailyVideo[];
    totalVideosUnlocked: number;
}

export const fetchDailyVideos = createAsyncThunk<FetchResponse, void, { rejectValue: string }>(
    'dailyVideos/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get<FetchResponse>('/user/videos/daily');
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch daily videos.');
        }
    }
);

const initialState: DailyVideoState = {
    videos: [],
    totalUnlocked: 0,
    isLoading: true,
    error: null,
};

const dailyVideoSlice = createSlice({
    name: 'dailyVideos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDailyVideos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDailyVideos.fulfilled, (state, action: PayloadAction<FetchResponse>) => {
                state.isLoading = false;
                state.videos = action.payload.videos;
                state.totalUnlocked = action.payload.totalVideosUnlocked;
            })
            .addCase(fetchDailyVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'An unknown error occurred';
            });
    },
});

export default dailyVideoSlice.reducer;
