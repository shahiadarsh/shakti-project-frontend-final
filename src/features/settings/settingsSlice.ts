import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api';
import { Settings, SettingsState } from './types';

export const fetchSettings = createAsyncThunk('settings/fetch', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get<{ settings: Settings }>('/admin/settings');
        return data.settings;
    } catch (error: any) { return rejectWithValue('Failed to fetch settings.'); }
});

export const updateSettings = createAsyncThunk('settings/update', async (settingsData: Partial<Settings>, { rejectWithValue }) => {
    try {
        const { data } = await api.patch<{ settings: Settings }>('/admin/settings', settingsData);
        return data.settings;
    } catch (error: any) { return rejectWithValue('Failed to update settings.'); }
});

const initialState: SettingsState = {
    settings: null,
    isLoading: false,
    error: null,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => { state.isLoading = true; })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateSettings.fulfilled, (state, action) => {
                state.settings = action.payload;
            });
    },
});

export default settingsSlice.reducer;