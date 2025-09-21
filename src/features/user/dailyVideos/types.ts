export interface DailyVideo {
    _id: string;
    title: string;
    description: string;
    videoFileUrl: string;
    scheduledUnlockTime: string;
    unlocksOn: string;
}

export interface DailyVideoState {
    videos: DailyVideo[];
    isLoading: boolean;
    error: string | null;
}
