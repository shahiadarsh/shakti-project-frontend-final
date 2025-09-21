import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, BookOpen, Radio, Play, Video } from 'lucide-react';

// यह मानें कि आपका डेटा ऐसा दिखेगा
interface Course {
    id: string;
    title: string;
    category: string;
    progress: number;
    thumbnail: string;
}

interface Session {
    id: string;
    title: string;
    time: string;
    date: string;
    month: string;
}

interface FullDashboardViewProps {
    courses?: Course[];
    sessions?: Session[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

const CourseCard = ({ course }: { course: Course }) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.03 }}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden group cursor-pointer"
    >
        <div className="relative aspect-video bg-gray-700 flex items-center justify-center">
            {/* <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" /> */}
            <div className="absolute inset-0 bg-black/30"></div>
            <Play className="h-12 w-12 text-white/70 transform transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="p-4">
            <p className="text-xs text-amber-400 font-semibold mb-1">{course.category}</p>
            <h3 className="font-bold text-white truncate">{course.title}</h3>
            <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
            </div>
        </div>
    </motion.div>
);

const SessionItem = ({ session }: { session: Session }) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ backgroundColor: 'rgba(245, 158, 11, 0.05)' }}
        className="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 border-b border-gray-800 last:border-b-0"
    >
        <div className="flex flex-col items-center justify-center w-16 h-16 bg-amber-500/10 rounded-lg border border-amber-500/20 flex-shrink-0">
            <span className="text-2xl font-bold text-amber-400">{session.date}</span>
            <span className="text-xs font-semibold text-gray-400">{session.month}</span>
        </div>
        <div className="flex-grow">
            <p className="font-bold text-white">{session.title}</p>
            <p className="text-sm text-gray-400">{session.time}</p>
        </div>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-sm font-semibold bg-gray-700 text-white rounded-md hover:bg-gray-600"
        >
            Join
        </motion.button>
    </motion.div>
);

const EmptyState = ({ title, description, buttonText, linkTo, icon: Icon }) => (
     <motion.div
        variants={itemVariants}
        className="bg-gray-900/50 backdrop-blur-sm border border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center text-center p-8 h-full"
    >
        <Icon className="h-12 w-12 text-gray-600 mb-4" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-500 mt-1 mb-6 max-w-xs">{description}</p>
        <Link to={linkTo}>
            <motion.button
                className="flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                <span>{buttonText}</span>
                <ArrowRight size={16} />
            </motion.button>
        </Link>
    </motion.div>
);


const FullDashboardView: React.FC<FullDashboardViewProps> = ({ courses = [], sessions = [] }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-12"
        >
            <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <BookOpen className="text-amber-400" />
                        Continue Your Journey
                    </h2>
                    <Link to="/user/courses" className="text-amber-400 font-semibold flex items-center gap-2 hover:underline">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map(course => <CourseCard key={course.id} course={course} />)}
                    </div>
                ) : (
                    <EmptyState 
                        title="Start Your First Course"
                        description="Your recently watched courses will appear here. Explore our library to begin."
                        buttonText="Explore Courses"
                        linkTo="/user/courses"
                        icon={Play}
                    />
                )}
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Radio className="text-amber-400" />
                        Upcoming Live Sessions
                    </h2>
                    <Link to="/user/live-sessions" className="text-amber-400 font-semibold flex items-center gap-2 hover:underline">
                        Full Schedule <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl">
                    {sessions.length > 0 ? (
                        <div className="p-2">
                             {sessions.map(session => <SessionItem key={session.id} session={session} />)}
                        </div>
                    ) : (
                        <EmptyState 
                            title="No Upcoming Sessions"
                            description="Check the full schedule for all available live sessions and events."
                            buttonText="View Schedule"
                            linkTo="/user/live-sessions"
                            icon={Video}
                        />
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FullDashboardView;