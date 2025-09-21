import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import CourseCard from '../../features/user/courses/components/CourseCard';
import CourseCardSkeleton from '../../features/user/courses/components/CourseCardSkeleton';
import { fetchUserCourses } from '../../features/user/courses/userCoursesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks';
import { AlertCircle, BookOpen } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

const UserCoursesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { courses, error } = useAppSelector(state => state.userCourses);

    useEffect(() => {
        dispatch(fetchUserCourses());
    }, [dispatch]);

    const renderContent = () => {

        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                {courses.map(course => (
                    <motion.div key={course._id} variants={itemVariants}>
                        <CourseCard course={course} />
                    </motion.div>
                ))}
            </motion.div>
        );
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={itemVariants} className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Our Courses
                </h1>
                <p className="text-gray-400 mt-3 text-lg max-w-3xl">
                    Explore our collection of guided practices to deepen your spiritual journey.
                </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default UserCoursesPage;