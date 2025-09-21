export interface Settings {
    _id: string;
    websiteName: string;
    razorpayKeyId?: string;
    razorpayKeySecret?: string;
}

export interface SettingsState {
    settings: Settings | null;
    isLoading: boolean;
    error: string | null;
}