import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../app/api';
import { LiveStream, UserLiveStreamsState } from './types';

export const fetchUserLiveStreams = createAsyncThunk<LiveStream[], void, { rejectValue: string }>(
    'userLiveStreams/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get<{ streams: LiveStream[] }>('/user/livestreams');
            return data.streams;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch streams.');
        }
    }
);

export const fetchLiveStreamById = createAsyncThunk<LiveStream, string, { rejectValue: string }>(
    'userLiveStreams/fetchById',
    async (streamId, { rejectWithValue }) => {
        try {
            const { data } = await api.get<{ stream: LiveStream }>(`/user/livestreams/${streamId}`);
            return data.stream;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch stream details.');
        }
    }
);

const initialState: UserLiveStreamsState = {
    streams: [],
    isLoading: false,
    error: null,
    currentStream: null,
    isCurrentLoading: false,
    currentError: null,
};

const userLiveStreamsSlice = createSlice({
    name: 'userLiveStreams',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserLiveStreams.pending, (state) => { state.isLoading = true; })
            .addCase(fetchUserLiveStreams.fulfilled, (state, action: PayloadAction<LiveStream[]>) => {
                state.isLoading = false;
                state.streams = action.payload;
            })
            .addCase(fetchUserLiveStreams.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Error';
            })
            .addCase(fetchLiveStreamById.pending, (state) => { state.isCurrentLoading = true; })
            .addCase(fetchLiveStreamById.fulfilled, (state, action: PayloadAction<LiveStream>) => {
                state.isCurrentLoading = false;
                state.currentStream = action.payload;
            })
            .addCase(fetchLiveStreamById.rejected, (state, action) => {
                state.isCurrentLoading = false;
                state.currentError = action.payload ?? 'Error';
            });
    },
});

export default userLiveStreamsSlice.reducer;