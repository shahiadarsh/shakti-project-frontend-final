import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../app/api';
import { Audio, AudioState } from './types';

export const fetchAudios = createAsyncThunk(
    'audios/fetchAll', 
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get<{ audios: Audio[] }>('/admin/audios');
            return data.audios;
        } catch (error: any) { 
            return rejectWithValue('Failed to fetch audios.'); 
        }
    }
);

export const addAudio = createAsyncThunk(
    'audios/add', 
    async (audioData: FormData, { rejectWithValue }) => {
        try {
            const { data } = await api.post<{ audio: Audio }>('/admin/audios', audioData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data.audio;
        } catch (error: any) { 
            return rejectWithValue('Failed to add audio.'); 
        }
    }
);

export const deleteAudio = createAsyncThunk(
    'audios/delete', 
    async (audioId: string, { rejectWithValue }) => {
        try {
            await api.delete(`/admin/audios/${audioId}`);
            return audioId;
        } catch (error: any) { 
            return rejectWithValue('Failed to delete audio.'); 
        }
    }
);

const initialState: AudioState = {
    audios: [],
    isLoading: false,
    error: null,
};

const audioSlice = createSlice({
    name: 'audios',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAudios.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAudios.fulfilled, (state, action) => {
                state.isLoading = false;
                state.audios = action.payload;
            })
            .addCase(fetchAudios.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(addAudio.fulfilled, (state, action) => {
                state.audios = [action.payload, ...state.audios];
                toast.success('Audio added successfully!');
            })
            .addCase(addAudio.rejected, (state, action) => {
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(deleteAudio.fulfilled, (state, action) => {
                state.audios = state.audios.filter(a => a._id !== action.payload);
                toast.success('Audio deleted successfully!');
            })
            .addCase(deleteAudio.rejected, (state, action) => {
                state.error = action.payload as string;
                toast.error(action.payload as string);
            });
    },
});

export default audioSlice.reducer;
