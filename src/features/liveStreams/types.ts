import { ContentItem } from "../courses/types";

export interface LiveStream {
    _id: string;
    title: string;
    video: ContentItem;
    startTime: string;
    durationInMinutes: number;
    status: 'SCHEDULED' | 'LIVE' | 'COMPLETED';
}

export interface LiveStreamState {
    streams: LiveStream[];
    videoOptions: ContentItem[];
    isLoading: boolean;
    error: string | null;
}