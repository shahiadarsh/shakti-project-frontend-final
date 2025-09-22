import React, {useState } from 'react';
import { FullCourse, ContentItem } from '../types';
import { Video, Music, BookText, PlayCircle } from 'lucide-react';

const CourseContentView: React.FC<{ course: FullCourse }> = ({ course }) => {
    const [activeContent, setActiveContent] = useState<ContentItem | null>(
        course.videos?.[0] || course.audios?.[0] || course.ebooks?.[0] || null
    );

    const renderPlaylist = (items: ContentItem[], type: 'video' | 'audio' | 'ebook') => {
        if (!items || items.length === 0) return null;
        const icon = type === 'video' ? <Video size={18} /> : type === 'audio' ? <Music size={18} /> : <BookText size={18} />;

        return (
            <div className="mt-6">
                <h3 className="text-xl font-semibold flex items-center gap-3 mb-3">
                    {icon}
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}s</span>
                </h3>
                <div className="space-y-2">
                    {items.map(item => (
                        <button
                            key={item._id}
                            onClick={() => setActiveContent(item)}
                            className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-colors ${
                                activeContent?._id === item._id ? 'bg-brand-accent/20' : 'hover:bg-dark-surface'
                            }`}
                        >
                            <PlayCircle size={20} className={activeContent?._id === item._id ? 'text-brand-accent' : 'text-text-secondary'} />
                            <span className="font-medium text-text-primary">{item.title}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="bg-black rounded-lg overflow-hidden sticky top-20">
                    {activeContent?.videoFileUrl && (
                        <div className="aspect-video">
                            <video
                                key={activeContent._id}
                                src={activeContent.videoFileUrl}
                                controls
                                autoPlay
                                controlsList="nodownload"
                                className="w-full h-full"
                            />
                        </div>
                    )}
                    {activeContent?.audioFileUrl && (
                        <div className="w-full h-[50vh] flex flex-col items-center justify-center p-8 bg-dark-main">
                            <Music size={64} className="text-brand-accent mb-4" />
                            <h3 className="text-2xl font-bold text-text-primary mb-6">{activeContent.title}</h3>
                            <audio
                                key={activeContent._id}
                                src={activeContent.audioFileUrl}
                                controls
                                autoPlay
                                controlsList="nodownload"
                                className="w-full max-w-md"
                            />
                        </div>
                    )}
                    {activeContent?.ebookFileUrl && (
                        <div className="w-full h-[85vh] bg-white">
                            <iframe
                                key={activeContent._id}
                                src={`https://docs.google.com/gview?url=${activeContent.ebookFileUrl}&embedded=true`}
                                title={activeContent.title}
                                className="w-full h-full border-0"
                            />
                        </div>
                    )}
                    {!activeContent && (
                        <div className="aspect-video flex items-center justify-center bg-dark-main">
                             <p className="text-center text-text-secondary">Select an item from the playlist to begin.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="card p-4">
                    <h2 className="text-2xl font-bold text-text-primary mb-4 border-b border-border-color pb-4">Course Content</h2>
                    {renderPlaylist(course.videos, 'video')}
                    {renderPlaylist(course.audios, 'audio')}
                    {renderPlaylist(course.ebooks, 'ebook')}
                </div>
            </div>
        </div>
    );
};

export default CourseContentView;
