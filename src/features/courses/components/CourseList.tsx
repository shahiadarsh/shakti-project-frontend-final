import React from 'react';
import { motion } from 'framer-motion';
import { Course } from '../types';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface CourseListProps {
    courses: Course[];
    onEdit: (course: Course) => void;
    onDelete: (courseId: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onEdit, onDelete }) => {
    if (courses.length === 0) {
        return (
            <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-text-primary">No Courses Found</h3>
                <p className="text-text-secondary mt-2">Click "Create New Course" to get started.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
                <thead className="bg-dark-main">
                    <tr>
                        <th className="p-4 font-semibold text-text-secondary">Title</th>
                        <th className="p-4 font-semibold text-text-secondary">Content</th>
                        <th className="p-4 font-semibold text-text-secondary">Status</th>
                        <th className="p-4 font-semibold text-text-secondary text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <motion.tr
                            key={course._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-b border-border-color hover:bg-dark-main"
                        >
                            <td className="p-4 font-medium text-text-primary">{course.title}</td>
                            <td className="p-4 text-text-secondary text-sm">
                                {course.videos.length} Videos, {course.audios.length} Audios, {course.ebooks.length} Ebooks
                            </td>
                            <td className="p-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                    course.isPublished 
                                    ? 'bg-success-color/20 text-success-color' 
                                    : 'bg-warning-color/20 text-warning-color'
                                }`}>
                                    {course.isPublished ? 'Published' : 'Draft'}
                                </span>
                            </td>
                            <td className="p-4 flex justify-end gap-2">
                                <button onClick={() => onEdit(course)} className="p-2 text-text-secondary hover:text-admin-primary transition-colors">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => onDelete(course._id)} className="p-2 text-text-secondary hover:text-error-color transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;