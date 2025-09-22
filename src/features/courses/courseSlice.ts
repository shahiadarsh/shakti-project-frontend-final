import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../app/api';
import { Course, CourseState, NewCourseData, UpdateCourseData } from './types';

export const fetchCourses = createAsyncThunk(
    'courses/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get<{ courses: Course[] }>('/admin/courses');
            return data.courses;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to fetch courses.';
            return rejectWithValue(message);
        }
    }
);

export const addCourse = createAsyncThunk(
    'courses/add',
    async (courseData: NewCourseData, { rejectWithValue }) => {
        try {
            const { data } = await api.post<{ course: Course }>('/admin/courses', courseData);
            return data.course;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create course.');
        }
    }
);

export const updateCourse = createAsyncThunk(
    'courses/update',
    async ({ courseId, courseData }: { courseId: string, courseData: UpdateCourseData }, { rejectWithValue }) => {
        try {
            const { data } = await api.patch<{ course: Course }>(`/admin/courses/${courseId}`, courseData);
            return data.course;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update course.');
        }
    }
);

export const deleteCourse = createAsyncThunk(
    'courses/delete',
    async (courseId: string, { rejectWithValue }) => {
        try {
            await api.delete(`/admin/courses/${courseId}`);
            return courseId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete course.');
        }
    }
);

const initialState: CourseState = {
    courses: [],
    isLoading: false,
    error: null,
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.courses.push(action.payload);
                toast.success('Course created successfully!');
            })
            .addCase(addCourse.rejected, (state, action) => {
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                const index = state.courses.findIndex(c => c._id === action.payload._id);
                if (index !== -1) {
                    state.courses[index] = action.payload;
                }
                toast.success('Course updated successfully!');
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.courses = state.courses.filter(c => c._id !== action.payload);
                toast.success('Course deleted successfully!');
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.error = action.payload as string;
                toast.error(action.payload as string);
            });
    },
});

export default courseSlice.reducer;
