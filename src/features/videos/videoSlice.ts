import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../app/api';
import { Video, VideoState } from './types';

export const fetchVideos = createAsyncThunk('videos/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get<{ videos: Video[] }>('/admin/videos');
        return data.videos;
    } catch (error: any) { return rejectWithValue('Failed to fetch videos.'); }
});

export const addVideo = createAsyncThunk('videos/add', async (videoData: FormData, { rejectWithValue }) => {
    try {
        const { data } = await api.post<{ video: Video }>('/admin/videos', videoData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.video;
    } catch (error: any) { return rejectWithValue('Failed to add video.'); }
}); 

export const deleteVideo = createAsyncThunk('videos/delete', async (videoId: string, { rejectWithValue }) => {
    try {
        await api.delete(`/admin/videos/${videoId}`);
        return videoId;
    } catch (error: any) { return rejectWithValue('Failed to delete video.'); }
});

const initialState: VideoState = {
    videos: [],
    isLoading: false,
    error: null,
};

const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => { 
                state.isLoading = true; 
            })
            .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<Video[]>) => {
                state.isLoading = false;
                state.videos = action.payload;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(addVideo.pending, (state) => {
                // Optional: show a specific loading state for uploads
            })
            .addCase(addVideo.fulfilled, (state, action: PayloadAction<Video>) => {
                state.videos.push(action.payload);
            })
            .addCase(addVideo.rejected, (state, action) => {
                // Optional: handle upload error specifically
                state.error = action.payload as string;
            })
            .addCase(deleteVideo.fulfilled, (state, action: PayloadAction<string>) => {
                state.videos = state.videos.filter(v => v._id !== action.payload);
            });
    },
});

export default videoSlice.reducer;