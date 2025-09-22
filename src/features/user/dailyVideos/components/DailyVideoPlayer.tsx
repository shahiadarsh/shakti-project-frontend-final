import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/typedHooks';
import { fetchDailyVideos } from '../dailyVideoSlice';
import { DailyVideo } from '../types';
import Spinner from '../../../../components/common/Spinner';
import { PlayCircle } from 'lucide-react';

const DailyVideoPlayer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { videos, isLoading, error } = useAppSelector(state => state.dailyVideos);
    const [currentVideo, setCurrentVideo] = useState<DailyVideo | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        dispatch(fetchDailyVideos());
    }, [dispatch]);

    useEffect(() => {
        if (videos && videos.length > 0) {
            setCurrentVideo(videos[0]);
        }
    }, [videos]);
    
    const handleVideoMetadataLoaded = () => {
        if (videoRef.current && currentVideo?.scheduledUnlockTime) {
            const scheduledTime = new Date(currentVideo.scheduledUnlockTime).getTime();
            const now = Date.now();
            const elapsedSeconds = (now - scheduledTime) / 1000;

            if (elapsedSeconds > 0 && elapsedSeconds < videoRef.current.duration) {
                videoRef.current.currentTime = elapsedSeconds;
            }
            videoRef.current.play();
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full min-h-[300px]"><Spinner /></div>;
    }
    if (error) {
        return <p className="text-error-color text-center p-4">{error}</p>;
    }
    if (videos.length === 0 && !isLoading) {
        return <p className="text-text-secondary text-center p-4">No scheduled videos are available yet. Please check back later.</p>;
    }

    return (
        <div className="w-full">
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                {currentVideo && (
                    <video 
                        key={currentVideo._id}
                        ref={videoRef}
                        src={currentVideo.videoFileUrl}
                        controls
                        onLoadedMetadata={handleVideoMetadataLoaded}
                        controlsList="nodownload"
                        className="w-full h-full"
                    >
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>

            <h3 className="text-2xl font-bold text-text-primary">{currentVideo?.title}</h3>
            <p className="text-text-secondary mt-2">{currentVideo?.description}</p>
            
            <div className="my-6 border-t border-border-color"></div>

            <h4 className="text-lg font-semibold text-text-primary mb-4">Available Practices</h4>
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
            </div>
        </div>
    );
};

export default DailyVideoPlayer;
