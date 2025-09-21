import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../app/api';
import { Course, FullCourse, UserCoursesState } from './types';

// Thunk to fetch the list of all courses for the library page
export const fetchUserCourses = createAsyncThunk<Course[], void, { rejectValue: string }>(
    'userCourses/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get<{ courses: Course[] }>('/user/courses');
            return data.courses;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses.');
        }
    }
);

// Thunk to fetch the full details of a single course by its ID
export const fetchCourseById = createAsyncThunk<FullCourse, string, { rejectValue: string }>(
    'userCourses/fetchById',
    async (courseId, { rejectWithValue }) => {
        try {
            const { data } = await api.get<{ course: FullCourse }>(`/user/courses/${courseId}`);
            return data.course;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch course details.');
        }
    }
);

const initialState: UserCoursesState = {
    courses: [],
    selectedCourse: null,
    isLoading: true,
    error: null,
};

const userCoursesSlice = createSlice({
    name: 'userCourses',
    initialState,
    reducers: {
        // This reducer is used to clear the detailed course data when the user
        // navigates away from the course detail page.
        clearSelectedCourse: (state) => {
            state.selectedCourse = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Cases for fetching the list of all courses
            .addCase(fetchUserCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
                state.isLoading = false;
                state.courses = action.payload;
            })
            .addCase(fetchUserCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'An unknown error occurred';
            })
            // Cases for fetching a single course by ID
            .addCase(fetchCourseById.pending, (state) => {
                state.isLoading = true;
                state.selectedCourse = null; // Clear previous course data
                state.error = null;
            })
            .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<FullCourse>) => {
                state.isLoading = false;
                state.selectedCourse = action.payload;
            })
            .addCase(fetchCourseById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'An unknown error occurred';
            });
    },
});

export const { clearSelectedCourse } = userCoursesSlice.actions;
export default userCoursesSlice.reducer;