import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api';
import { LiveStream, LiveStreamState } from './types';
import { ContentItem } from '../courses/types'; // Corrected import path for ContentItem

export const fetchStreams = createAsyncThunk('liveStreams/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get<{ streams: LiveStream[] }>('/admin/livestreams');
        return data.streams;
    } catch (error: any) { return rejectWithValue('Failed to fetch streams.'); }
});

export const fetchVideosForForm = createAsyncThunk('liveStreams/fetchVideos', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get<{ videos: ContentItem[] }>('/admin/videos');
        return data.videos;
    } catch (error: any) { return rejectWithValue('Failed to fetch videos.'); }
});

export const addStream = createAsyncThunk('liveStreams/add', async (streamData: Omit<LiveStream, '_id' | 'video' | 'status'> & { video: string }, { rejectWithValue }) => {
    try {
        const { data } = await api.post<{ stream: LiveStream }>('/admin/livestreams', streamData);
        return data.stream;
    } catch (error: any) { return rejectWithValue('Failed to schedule stream.'); }
});

export const deleteStream = createAsyncThunk('liveStreams/delete', async (streamId: string, { rejectWithValue }) => {
    try {
        await api.delete(`/admin/livestreams/${streamId}`);
        return streamId;
    } catch (error: any) { return rejectWithValue('Failed to delete stream.'); }
});


const initialState: LiveStreamState = {
    streams: [],
    videoOptions: [],
    isLoading: false,
    error: null,
};

const liveStreamSlice = createSlice({
    name: 'liveStreams',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStreams.pending, (state) => { state.isLoading = true; })
            .addCase(fetchStreams.fulfilled, (state, action) => {
                state.isLoading = false;
                state.streams = action.payload;
            })
            .addCase(fetchStreams.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchVideosForForm.fulfilled, (state, action) => {
                state.videoOptions = action.payload;
            })
            .addCase(addStream.fulfilled, (state, action) => {
                state.streams = [action.payload, ...state.streams];
            })
            .addCase(deleteStream.fulfilled, (state, action) => {
                state.streams = state.streams.filter(s => s._id !== action.payload);
            });
    },
});

export default liveStreamSlice.reducer;