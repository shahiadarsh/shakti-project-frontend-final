import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LiveStream } from '../types';
import { Radio, Calendar, Clock } from 'lucide-react';

interface LiveStreamCardProps {
    stream: LiveStream;
}

const LiveStreamCard: React.FC<LiveStreamCardProps> = ({ stream }) => {
    return (
        <motion.div whileHover={{ y: -5 }} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col">
            <div className={`relative p-6 flex-grow flex flex-col ${stream.status === 'LIVE' ? 'bg-red-900/20' : ''}`}>
                {stream.status === 'LIVE' && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">
                        <Radio size={14} /> LIVE
                    </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2 flex-grow">{stream.title}</h3>
                <p className="text-gray-400 text-sm mb-4">Video: {stream.video.title}</p>
                <div className="text-sm text-gray-400 flex flex-wrap gap-x-4 gap-y-2 mt-auto pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{new Date(stream.startTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{new Date(stream.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
                <div className="mt-6">
                    {stream.status === 'LIVE' ? (
                        <Link to={`/live-sessions/${stream._id}`} className="block w-full text-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
                            Join Live Session
                        </Link>
                    ) : (
                        <div className="text-center bg-gray-800 p-3 rounded-lg text-gray-400 font-semibold">
                            Upcoming
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default LiveStreamCard;