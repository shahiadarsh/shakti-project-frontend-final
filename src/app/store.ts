import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice'; 
import courseReducer from '../features/courses/courseSlice';
import contentReducer from '../features/courses/contentSlice';
import videoReducer from '../features/videos/videoSlice';
import audioReducer from '../features/audios/audioSlice';
import ebookReducer from '../features/ebooks/ebookSlice';
import liveStreamReducer from '../features/liveStreams/liveStreamSlice';
import userReducer from '../features/users/userSlice';
import settingsReducer from '../features/settings/settingsSlice';
import userDashboardReducer from '../features/user/userDashboard/userDashboardSlice';
import dailyVideoReducer from '../features/user/dailyVideos/dailyVideoSlice';
import userCoursesReducer from '../features/user/courses/userCoursesSlice';
import userLiveStreamsReducer from '../features/user/liveStreams/userLiveStreamsSlice';
import subscriptionReducer from '../features/user/subscription/subscriptionSlice';
import profileReducer from '../features/user/profile/profileSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        courses: courseReducer, 
        content: contentReducer,
        videos: videoReducer,
        audios: audioReducer,
        ebooks: ebookReducer,
        liveStreams: liveStreamReducer,
        users: userReducer,
        settings: settingsReducer,

        //users
        userDashboard: userDashboardReducer,
        dailyVideos: dailyVideoReducer,
        userCourses: userCoursesReducer,
        userLiveStreams: userLiveStreamsReducer,
        subscription: subscriptionReducer,
        profile: profileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;