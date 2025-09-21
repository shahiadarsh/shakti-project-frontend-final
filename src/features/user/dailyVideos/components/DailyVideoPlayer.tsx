// src/features/user/dailyVideos/components/DailyVideoPlayer.tsx

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/typedHooks';
import { fetchDailyVideos } from '../dailyVideoSlice';
import { DailyVideo } from '../types';
import Spinner from '../../../../components/common/Spinner';
import { PlayCircle, Lock } from 'lucide-react';

const DailyVideoPlayer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { videos, isLoading, error, totalUnlocked } = useAppSelector(state => state.dailyVideos);
    const [currentVideo, setCurrentVideo] = useState<DailyVideo | null>(null);

    useEffect(() => {
        dispatch(fetchDailyVideos());
    }, [dispatch]);

    useEffect(() => {
        if (videos && videos.length > 0) {
            setCurrentVideo(videos[videos.length - 1]);
        } else {
            setCurrentVideo(null);
        }
    }, [videos]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-full min-h-[300px]"><Spinner /></div>;
    }
    if (error) {
        return <p className="text-error-color text-center p-4">{error}</p>;
    }
    if (videos.length === 0 && !isLoading) {
        return <p className="text-text-secondary text-center p-4">Your first video will be unlocked shortly. Please refresh in a moment.</p>;
    }

    return (
        <div className="w-full">
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                {currentVideo ? (
                    <video key={currentVideo._id} src={currentVideo.videoFileUrl} controls autoPlay className="w-full h-full">
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="w-full h-full flex items-center justify-center"><p className="text-text-secondary">Select a video to play</p></div>
                )}
            </div>

            <h3 className="text-2xl font-bold text-text-primary">{currentVideo?.title}</h3>
            <p className="text-text-secondary mt-2">{currentVideo?.description}</p>
            
            <div className="my-6 border-t border-border-color"></div>

            <h4 className="text-lg font-semibold text-text-primary mb-4">Your Unlocked Practices (Total: {totalUnlocked}/3)</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {videos.map(video => (
                    <button 
                        key={video._id}
                        onClick={() => setCurrentVideo(video)}
                        className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-colors ${
                            currentVideo?._id === video._id ? 'bg-brand-accent/20' : 'hover:bg-dark-surface'
                        }`}
                    >
                        <PlayCircle size={20} className={currentVideo?._id === video._id ? 'text-brand-accent' : 'text-text-secondary'} />
                        <span className="font-medium text-text-primary">{video.title}</span>
                    </button>
                ))}
                {Array.from({ length: 3 - totalUnlocked }).map((_, index) => (
                    <div key={index} className="w-full flex items-center gap-4 p-3 rounded-lg text-left bg-dark-main cursor-not-allowed">
                        <Lock size={20} className="text-text-secondary/50" />
                        <span className="font-medium text-text-secondary/50">Day {totalUnlocked + index + 1}: Unlocks Tomorrow</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyVideoPlayer;
