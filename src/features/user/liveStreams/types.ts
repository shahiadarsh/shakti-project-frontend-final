export interface SimpleVideo {
    _id: string;
    title: string;
    videoFileUrl: string;
}

export interface LiveStream {
    _id: string;
    title: string;
    video: SimpleVideo;
    startTime: string;
    durationInMinutes: number;
    status: 'SCHEDULED' | 'LIVE' | 'COMPLETED';
}

export interface UserLiveStreamsState {
    streams: LiveStream[];
    isLoading: boolean;
    error: string | null;
    currentStream: LiveStream | null;
    isCurrentLoading: boolean;
    currentError: string | null;
}