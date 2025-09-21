import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks';
import { fetchCourseById, clearSelectedCourse } from '../../features/user/courses/userCoursesSlice';
import Spinner from '../../components/common/Spinner';
import CourseContentView from '../../features/user/courses/components/CourseContentView';
import { motion } from 'framer-motion';

const UserCourseDetailPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const dispatch = useAppDispatch();
    const { selectedCourse, isLoading, error } = useAppSelector(state => state.userCourses);

    useEffect(() => {
        if (courseId) {
            dispatch(fetchCourseById(courseId));
        }

        // Cleanup function: runs when the component is unmounted
        return () => {
            dispatch(clearSelectedCourse());
        };
    }, [dispatch, courseId]);

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex justify-center items-center h-96"><Spinner /></div>;
        }
        if (error) {
            return <p className="text-error-color text-center">{error}</p>;
        }
        if (!selectedCourse) {
            return <p className="text-text-secondary text-center">Course not found.</p>;
        }
        return <CourseContentView course={selectedCourse} />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                    {selectedCourse?.title || 'Loading Course...'}
                </h1>
                <p className="text-text-secondary mt-2 text-lg">
                    {selectedCourse?.description}
                </p>
            </div>
            
            {renderContent()}
        </motion.div>
    );
};

export default UserCourseDetailPage;