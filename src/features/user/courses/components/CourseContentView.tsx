import React, { useState, useRef, useEffect } from 'react';
import { FullCourse, ContentItem } from '../types';
import { Video, Music, BookText, PlayCircle, Loader2, AlertTriangle } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pdfData, setPdfData] = useState<Blob | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPdfWithProxy = async () => {
            setIsLoading(true);
            setError(null);
            setPdfData(null);
            
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const proxiedFileUrl = `${proxyUrl}${fileUrl}`;

            try {
                const response = await axios.get(proxiedFileUrl, { 
                    responseType: 'blob',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                setPdfData(response.data);
            } catch (err) {
                console.error("Error fetching PDF via proxy:", err);
                setError('Could not load the PDF file. Please check the URL or network connection.');
            } finally {
                setIsLoading(false);
            }
        };
        
        if (fileUrl) {
            fetchPdfWithProxy();
        }
    }, [fileUrl]);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }
    
    if (isLoading) {
        return (
            <div className="w-full h-[85vh] flex justify-center items-center bg-gray-200">
                <Loader2 className="animate-spin text-gray-700" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[85vh] flex flex-col justify-center items-center bg-red-100 text-center p-4">
                <AlertTriangle className="text-red-500 mb-4" size={48} />
                <p className="text-red-700 font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="w-full h-[85vh] bg-gray-200 overflow-y-auto flex justify-center">
            {pdfData && (
                <Document
                    file={pdfData}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(numPages || 0), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            width={containerWidth > 0 ? containerWidth : undefined}
                        />
                    ))}
                </Document>
            )}
        </div>
    );
};

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
                        <PdfViewer key={activeContent._id} fileUrl={activeContent.ebookFileUrl} />
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
