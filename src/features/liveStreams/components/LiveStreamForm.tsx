import React, { useState, useEffect, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/typedHooks';
import { addStream, fetchVideosForForm } from '../liveStreamSlice';

interface LiveStreamFormProps {
    onClose: () => void;
}

const LiveStreamForm: React.FC<LiveStreamFormProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const { videoOptions } = useAppSelector(state => state.liveStreams);

    const [title, setTitle] = useState('');
    const [videoId, setVideoId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [durationInMinutes, setDurationInMinutes] = useState(60);
    
    // Helper function to format date for datetime-local input
    const formatDateForInput = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    useEffect(() => {
        dispatch(fetchVideosForForm());
    }, [dispatch]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!videoId || !startTime) {
            alert('Please fill out all required fields.');
            return;
        }
        
        // Convert local time to ISO string for proper timezone handling
        const localDateTime = new Date(startTime);
        const isoString = localDateTime.toISOString();
        
        dispatch(addStream({ title, video: videoId, startTime: isoString, durationInMinutes }));
        onClose();
    };

    // --- STYLES TO MATCH THE SCREENSHOT PERFECTLY ---
    
    const inputStyle = "w-full bg-slate-900/70 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-inner";
    const labelStyle = "block text-sm font-medium text-slate-400";

    return (
        // The form container now has no background color of its own; it inherits from the modal
        <div className="px-8 py-6">
            <div className="bg-slate-800/80 p-8 rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="session-title" className={labelStyle}>Session Title</label>
                        <input
                            id="session-title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className={inputStyle}
                            placeholder="e.g., Weekly Product Demo"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="pre-recorded-video" className={labelStyle}>Pre-recorded Video</label>
                        <select
                            id="pre-recorded-video"
                            value={videoId}
                            onChange={e => setVideoId(e.target.value)}
                            className={`${inputStyle} appearance-none`}
                            required
                        >
                            <option value="" disabled>Select a video to stream</option>
                            {videoOptions.map(video => (
                                <option key={video._id} value={video._id} className="bg-slate-800 text-slate-200">
                                    {video.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="start-time" className={labelStyle}>Start Time</label>
                        <input
                            id="start-time"
                            type="datetime-local"
                            value={startTime || formatDateForInput(new Date())}
                            onChange={e => setStartTime(e.target.value)}
                            className={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="duration" className={labelStyle}>Duration (in minutes)</label>
                        <input
                            id="duration"
                            type="number"
                            value={durationInMinutes}
                            onChange={e => setDurationInMinutes(Number(e.target.value))}
                            className={inputStyle}
                            placeholder="60"
                            required
                            min="1"
                        />
                    </div>
                    
                    {/* Button container */}
                    <div className="flex justify-end items-center gap-4 pt-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2.5 px-6 bg-slate-700/60 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/90 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2.5 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-600/20"
                        >
                            Schedule Stream
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LiveStreamForm;