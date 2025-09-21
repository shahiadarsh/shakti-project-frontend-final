    import React, { useState, useEffect } from 'react';
    import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
    import { fetchCourses, deleteCourse } from '../features/courses/courseSlice';
    import Modal from '../components/common/Modal';
    import CourseForm from '../features/courses/components/CourseForm';
    import CourseList from '../features/courses/components/CourseList';
    import { Course } from '../features/courses/types';
    import { Plus, AlertCircle, Loader2 } from 'lucide-react';
    import { motion } from 'framer-motion';

    const CourseManagementPage: React.FC = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [editingCourse, setEditingCourse] = useState<Course | null>(null);
        
        const dispatch = useAppDispatch();
        const { courses, isLoading, error } = useAppSelector((state) => state.courses);

        useEffect(() => {
            document.body.classList.add('admin-body');
            dispatch(fetchCourses());
            return () => {
                document.body.classList.remove('admin-body');
            };
        }, [dispatch]);

        const handleCreateNew = () => {
            setEditingCourse(null);
            setIsModalOpen(true);
        };

        const handleEdit = (course: Course) => {
            setEditingCourse(course);
            setIsModalOpen(true);
        };

        const handleDelete = (courseId: string) => {
            if (window.confirm('Are you sure you want to delete this course?')) {
                dispatch(deleteCourse(courseId));
            }
        };
        
        const closeModal = () => {
            setIsModalOpen(false);
            setEditingCourse(null);
        };

        const renderContent = () => {
            if (isLoading && courses.length === 0) {
                return (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-admin-accent-blue mb-4" />
                        <p className="admin-body-text">Loading courses...</p>
                    </div>
                );
            }
            if (error) {
                return (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                        <AlertCircle className="h-10 w-10 text-admin-error mb-4" />
                        <h3 className="admin-heading-3 text-admin-error mb-2">Failed to load courses</h3>
                        <p className="admin-body-text max-w-sm">{error}</p>
                    </div>
                );
            }
            return (
                <CourseList 
                    courses={courses}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            );
        };

        return (
            <>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="p-8 max-w-7xl mx-auto space-y-8"
                >
                    <motion.div 
                        className="flex flex-wrap justify-between items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div>
                            <h1 className="admin-heading-1">Course Management</h1>
                            <p className="admin-body-text mt-1">Create, edit, and manage all your courses.</p>
                        </div>
                        <motion.button 
                            onClick={handleCreateNew} 
                            className="admin-button-primary flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Plus size={18} />
                            <span>Create New Course</span>
                        </motion.button>
                    </motion.div>
                    
                    <motion.div 
                        className="admin-card p-0 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {renderContent()}
                    </motion.div>
                </motion.div>

                <Modal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    title={editingCourse ? 'Edit Course Details' : 'Create a New Course'}
                >
                    <CourseForm 
                        onClose={closeModal}
                        initialData={editingCourse} 
                    />
                </Modal>
            </>
        );
    };

    export default CourseManagementPage;
