export interface Audio {
    _id: string;
    title: string;
    description: string;
    artist: string;
    audioFileUrl: string;
    createdAt: string;
}

export interface AudioState {
    audios: Audio[];
    isLoading: boolean;
    error: string | null;
}