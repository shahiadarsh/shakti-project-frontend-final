import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { ArrowRight } from 'lucide-react';

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card bg-dark-surface overflow-hidden h-full flex flex-col"
        >
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-text-primary mb-2 flex-grow">{course.title}</h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-grow">{course.description}</p>
                <Link to={`/courses/${course._id}`} className="mt-auto">
                    <button className="btn btn-primary w-full flex items-center justify-center gap-2">
                        <span>Start Course</span>
                        <ArrowRight size={18} />
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default CourseCard;