import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../app/api';
import { User } from '../../auth/types';
import { ProfileState, ProfileUpdateData } from './types';

// IMPORTANT: Naya action jo authSlice me user ko update karega
import { userUpdated } from '../../auth/authSlice';

export const updateUserProfile = createAsyncThunk<User, ProfileUpdateData, { dispatch: any; rejectValue: string }>(
    'profile/update',
    async (profileData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await api.patch<{ user: User }>('/user/profile', profileData);
            // Profile update hone ke baad, auth slice ko bhi update karein
            dispatch(userUpdated(data.user));
            return data.user;
        } catch (error: any) {
            return rejectWithValue('Failed to update profile.');
        }
    }
);

const initialState: ProfileState = {
    isUpdating: false,
    error: null,
    successMessage: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfileMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserProfile.pending, (state) => {
                state.isUpdating = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateUserProfile.fulfilled, (state) => {
                state.isUpdating = false;
                state.successMessage = "Profile updated successfully!";
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearProfileMessages } = profileSlice.actions;
export default profileSlice.reducer;