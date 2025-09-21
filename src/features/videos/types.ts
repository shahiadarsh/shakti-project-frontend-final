export interface Video {
    _id: string;
    title: string;
    description: string;
    videoFileUrl: string;
    sequenceOrder: number;
    createdAt: string;
}

export interface VideoState {
    videos: Video[];
    isLoading: boolean;
    error: string | null;
}