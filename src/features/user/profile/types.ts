import { User } from '../../auth/types'; // Auth slice se User type ko reuse karein

export interface ProfileUpdateData {
    name?: string;
    mobileNumber?: string;
}

export interface ProfileState {
    isUpdating: boolean;
    error: string | null;
    successMessage: string | null;
}