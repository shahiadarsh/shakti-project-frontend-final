import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import VideoManagementPage from "./pages/VideoManagementPage";
import LiveStreamManagementPage from "./pages/LiveStreamManagementPage"; // BrowserRouter removed from here

import Index from "./pages/Index";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import Courses from "./pages/Courses";
import { Community } from "./pages/Community";
import { LiveSessions } from "./pages/LiveSessions";
import NotFound from "./pages/NotFound";

import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import DashboardPage from "./pages/DashboardPage";
import CourseManagementPage from "./pages/CourseManagementPage";
import AudioManagementPage from "./pages/AudioManagementPage";
import EbookManagementPage from "./pages/EbookManagementPage";
import UserManagementPage from "./pages/UserManagementPage";
import SettingsPage from "./pages/SettingsPage";
import UserLayout from "./components/layout/UserLayout";
import ProtectedUserRoute from "./routes/ProtectedUserRoute";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import UserCoursesPage from './pages/user/UserCoursesPage'; // <-- Import
import FullAccessRoute from './routes/FullAccessRoute';
import UserCourseDetailPage from './pages/user/UserCourseDetailPage';
import UserLiveSessionsPage from './pages/user/UserLiveSessionsPage';
import UserSubscriptionPage from './pages/user/UserSubscriptionPage';
import UserProfilePage from './pages/user/UserProfilePage';
import LiveSessionPlayerPage from './pages/user/LiveSessionPlayerPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* --- THE FIX IS HERE --- */}
      {/* The <BrowserRouter> component has been removed from this file. */}
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/community" element={<Community />} />
        <Route path="/live-sessions" element={<LiveSessions />} />

        <Route
          path="/admin/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* --- This is the route for our new dashboard page --- */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="courses" element={<CourseManagementPage />} />
          <Route path="content/videos" element={<VideoManagementPage />} />
          <Route path="content/audios" element={<AudioManagementPage />} />
          <Route path="content/ebooks" element={<EbookManagementPage />} />
          <Route path="livestreams" element={<LiveStreamManagementPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* Aap yahan par aur admin routes add karenge, jaise courses, users, etc. */}
        </Route>

        {/* user-dashboard */}

        <Route
          element={
            <ProtectedUserRoute>
              <UserLayout />
            </ProtectedUserRoute>
          }
        >
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route
            path="/user/courses"
            element={
              <FullAccessRoute>
                <UserCoursesPage />
              </FullAccessRoute>
            }
          />
          <Route 
            path="/courses/:courseId" 
            element={
              <FullAccessRoute>
                <UserCourseDetailPage />
              </FullAccessRoute>
            } 
          />

          <Route 
            path="/user/live-sessions" 
            element={
              <FullAccessRoute>
                <UserLiveSessionsPage />
              </FullAccessRoute>
            } 
          />
          <Route path="/my-account/subscription" element={<UserSubscriptionPage />} />
          <Route path="/my-account/profile" element={<UserProfilePage />} />
          <Route path="/live-sessions/:streamId" element={<LiveSessionPlayerPage />} />
          {/* <Route path="/live-sessions" element={<UserLiveSessionsPage />} /> */}
          {/* <Route path="/my-account/subscription" element={<UserSubscriptionPage />} /> */}
          {/* Add other user routes like /my-account/profile here */}
        </Route>

        {/* <Route path="/dashboard" element={<UserDashboardPage />} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;