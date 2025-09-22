import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks';
import { fetchLiveStreamById } from '../../features/user/liveStreams/userLiveStreamsSlice';
import { AlertCircle, Clock, Loader2, VideoOff } from 'lucide-react';

const LiveSessionPlayerPage: React.FC = () => {
    const { streamId } = useParams<{ streamId: string }>();
    const dispatch = useAppDispatch();
    const playerRef = useRef<HTMLVideoElement>(null);

    const { currentStream: stream, isCurrentLoading, currentError } = useAppSelector(state => state.userLiveStreams);

    useEffect(() => {
        if (streamId) {
            dispatch(fetchLiveStreamById(streamId));
        }
    }, [streamId, dispatch]);

    const handleMetadataLoad = () => {
        if (!playerRef.current || !stream || stream.status !== 'LIVE') {
            return;
        }
        
        const now = Date.now();
        const startTime = new Date(stream.startTime).getTime();
        const elapsedSeconds = (now - startTime) / 1000;

        if (elapsedSeconds > 0) {
            playerRef.current.currentTime = elapsedSeconds;
        }
    };

    if (isCurrentLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                <p className="mt-4 text-gray-400">Loading Session...</p>
            </div>
        );
    }

    if (currentError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-red-500/5 border border-red-500/20 rounded-xl p-8">
                <AlertCircle className="h-10 w-10 text-red-400 mb-4" />
                <p className="text-red-400 text-center font-semibold">{currentError}</p>
            </div>
        );
    }

    if (!stream) {
        return null;
    }

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{stream.title}</h1>
            <p className="text-gray-400 mb-8">Session Time: {new Date(stream.startTime).toLocaleString()}</p>

            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden relative">
                {stream.status === 'LIVE' && stream.video?.videoFileUrl ? (
                     <video
                        ref={playerRef}
                        src={stream.video.videoFileUrl}
                        autoPlay
                        controls
                        muted
                        className="w-full h-full"
                        controlsList="nodownload"
                        onLoadedMetadata={handleMetadataLoad}
                        onError={(e) => console.error('HTML Video Player Error:', e)}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                        {stream.status === 'SCHEDULED' && (
                             <>
                                <Clock className="h-12 w-12 text-amber-500 mb-4"/>
                                <p className="text-xl font-semibold text-white">Session will start automatically.</p>
                             </>
                        )}
                        {stream.status === 'COMPLETED' && (
                            <>
                               <VideoOff className="h-12 w-12 text-gray-500 mb-4"/>
                               <p className="text-xl font-semibold text-white">This session has ended.</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveSessionPlayerPage;
