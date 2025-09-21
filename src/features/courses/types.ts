export interface ContentItem {
    _id: string;
    title: string;
}

export interface Course {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    videos: ContentItem[];
    audios: ContentItem[];
    ebooks: ContentItem[];
    isPublished: boolean;
    createdAt: string;
}

export interface NewCourseData {
    title: string;
    description: string;
    thumbnail: string;
    isPublished: boolean;
    videos: string[];
    audios: string[];
    ebooks: string[];
}

export type UpdateCourseData = Partial<NewCourseData>;

export interface CourseState {
    courses: Course[];
    isLoading: boolean;
    error: string | null;
}

export interface ContentState {
    videos: ContentItem[];
    audios: ContentItem[];
    ebooks: ContentItem[];
    isLoading: boolean;
    error: string | null;
}
