export interface DailyVideo {
    _id: string;
    title: string;
    description: string;
    videoFileUrl: string;
    sequenceOrder: number;
}

export interface DailyVideoState {
    videos: DailyVideo[];
    totalUnlocked: number;
    isLoading: boolean;
    error: string | null;
}
