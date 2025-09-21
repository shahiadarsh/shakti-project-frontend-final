// Course ka structure, jaisa ki user ko dikhega
export interface Course {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
}

// User Courses slice ki state ka structure
export interface UserCoursesState {
    courses: Course[];
    isLoading: boolean;
    error: string | null;
    // courses: Course[]; // For the library page
    selectedCourse: FullCourse | null; // For the detail page
}

export interface ContentItem {
    _id: string;
    title: string;
    description?: string;
    videoFileUrl?: string;
    audioFileUrl?: string;
    ebookFileUrl?: string;
}

export interface FullCourse extends Course {
    videos: ContentItem[];
    audios: ContentItem[];
    ebooks: ContentItem[];
}