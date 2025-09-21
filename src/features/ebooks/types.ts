export interface Ebook {
    _id: string;
    title: string;
    description: string;
    author: string;
    coverImageUrl: string;
    ebookFileUrl: string;
    createdAt: string;
}

export interface EbookState {
    ebooks: Ebook[];
    isLoading: boolean;
    error: string | null;
}