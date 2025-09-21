import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api';
import { Ebook, EbookState } from './types';

export const fetchEbooks = createAsyncThunk('ebooks/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get<{ ebooks: Ebook[] }>('/admin/ebooks');
        return data.ebooks;
    } catch (error: any) { return rejectWithValue('Failed to fetch ebooks.'); }
});

export const addEbook = createAsyncThunk('ebooks/add', async (ebookData: FormData, { rejectWithValue }) => {
    try {
        const { data } = await api.post<{ ebook: Ebook }>('/admin/ebooks', ebookData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.ebook;
    } catch (error: any) { return rejectWithValue('Failed to add ebook.'); }
});

export const deleteEbook = createAsyncThunk('ebooks/delete', async (ebookId: string, { rejectWithValue }) => {
    try {
        await api.delete(`/admin/ebooks/${ebookId}`);
        return ebookId;
    } catch (error: any) { return rejectWithValue('Failed to delete ebook.'); }
});

const initialState: EbookState = {
    ebooks: [],
    isLoading: false,
    error: null,
};

const ebookSlice = createSlice({
    name: 'ebooks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEbooks.pending, (state) => { state.isLoading = true; })
            .addCase(fetchEbooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ebooks = action.payload;
            })
            .addCase(fetchEbooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(addEbook.fulfilled, (state, action) => {
                state.ebooks = [action.payload, ...state.ebooks];
            })
            .addCase(deleteEbook.fulfilled, (state, action) => {
                state.ebooks = state.ebooks.filter(e => e._id !== action.payload);
            });
    },
});

export default ebookSlice.reducer;