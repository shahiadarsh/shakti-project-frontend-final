import React, { useState, useEffect, useMemo, FormEvent } from 'react';
import Select, { StylesConfig } from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../hooks/typedHooks';
import { addCourse, updateCourse } from '../courseSlice';
import { fetchContentForForm } from '../contentSlice'; // Corrected Path
import { Course } from '../types';

interface CourseFormProps {
    onClose: () => void;
    initialData?: Course | null;
}

type SelectOptionType = { value: string; label: string; };

const CourseForm: React.FC<CourseFormProps> = ({ onClose, initialData }) => {
    const dispatch = useAppDispatch();
    const { videos, audios, ebooks, isLoading: isContentLoading } = useAppSelector((state) => state.content);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState<readonly SelectOptionType[]>([]);
    const [selectedAudios, setSelectedAudios] = useState<readonly SelectOptionType[]>([]);
    const [selectedEbooks, setSelectedEbooks] = useState<readonly SelectOptionType[]>([]);

    const isEditMode = !!initialData;

    useEffect(() => {
        dispatch(fetchContentForForm());
    }, [dispatch]);

    useEffect(() => {
        if (isEditMode && initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setThumbnail(initialData.thumbnail);
            setIsPublished(initialData.isPublished);
            setSelectedVideos(initialData.videos.map(v => ({ value: v._id, label: v.title })));
            setSelectedAudios(initialData.audios.map(a => ({ value: a._id, label: a.title })));
            setSelectedEbooks(initialData.ebooks.map(e => ({ value: e._id, label: e.title })));
        }
    }, [initialData, isEditMode]);

    const videoOptions = useMemo(() => videos.map(v => ({ value: v._id, label: v.title })), [videos]);
    const audioOptions = useMemo(() => audios.map(a => ({ value: a._id, label: a.title })), [audios]);
    const ebookOptions = useMemo(() => ebooks.map(e => ({ value: e._id, label: e.title })), [ebooks]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const courseDataPayload = {
            title,
            description,
            thumbnail,
            isPublished,
            videos: selectedVideos.map(v => v.value),
            audios: selectedAudios.map(a => a.value),
            ebooks: selectedEbooks.map(e => e.value),
        };

        if (isEditMode && initialData) {
            dispatch(updateCourse({ courseId: initialData._id, courseData: courseDataPayload }));
        } else {
            dispatch(addCourse(courseDataPayload));
        }
        onClose();
    };
    
    const labelStyle = "block text-sm font-medium text-slate-300 mb-1.5";
    const inputStyle = "w-full bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";

    const customSelectStyles: StylesConfig<SelectOptionType, true> = {
        control: (provided) => ({ ...provided, backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem', padding: '2px', minHeight: '46px', boxShadow: 'none', '&:hover': { borderColor: '#475569' } }),
        menu: (provided) => ({ ...provided, backgroundColor: '#1e293b', borderRadius: '0.5rem', border: '1px solid #334155' }),
        option: (provided, state) => ({ ...provided, backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#334155' : 'transparent', color: '#f1f5f9', borderRadius: '0.375rem', padding: '0.5rem 0.75rem', margin: '0.125rem 0.25rem', width: 'calc(100% - 0.5rem)' }),
        multiValue: (provided) => ({ ...provided, backgroundColor: '#334155', borderRadius: '0.375rem' }),
        multiValueLabel: (provided) => ({ ...provided, color: '#f1f5f9' }),
        multiValueRemove: (provided) => ({ ...provided, color: '#94a3b8', '&:hover': { backgroundColor: '#475569', color: 'white' } }),
        placeholder: (provided) => ({ ...provided, color: '#64748b' }),
        input: (provided) => ({ ...provided, color: '#f1f5f9' }),
        indicatorSeparator: () => ({ display: 'none' }),
    };

    return (
        <div className="bg-slate-900 p-6 rounded-lg"> 
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="course-title" className={labelStyle}>Course Title</label>
                    <input id="course-title" type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputStyle} required />
                </div>
                <div>
                    <label htmlFor="course-description" className={labelStyle}>Description</label>
                    <textarea id="course-description" value={description} onChange={e => setDescription(e.target.value)} className={`${inputStyle} min-h-[120px]`} required />
                </div>
                <div>
                    <label htmlFor="thumbnail-url" className={labelStyle}>Thumbnail URL</label>
                    <input id="thumbnail-url" type="text" value={thumbnail} onChange={e => setThumbnail(e.target.value)} className={inputStyle} required />
                </div>
                <div>
                    <label className={labelStyle}>Select Videos</label>
                    <Select isMulti options={videoOptions} styles={customSelectStyles} value={selectedVideos} onChange={setSelectedVideos} isLoading={isContentLoading} placeholder="Choose videos..." />
                </div>
                <div>
                    <label className={labelStyle}>Select Audios</label>
                    <Select isMulti options={audioOptions} styles={customSelectStyles} value={selectedAudios} onChange={setSelectedAudios} isLoading={isContentLoading} placeholder="Choose audios..." />
                </div>
                <div>
                    <label className={labelStyle}>Select Ebooks</label>
                    <Select isMulti options={ebookOptions} styles={customSelectStyles} value={selectedEbooks} onChange={setSelectedEbooks} isLoading={isContentLoading} placeholder="Choose ebooks..." />
                </div>
                <div className="flex items-center pt-4">
                    <input type="checkbox" id="isPublished" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500" />
                    <label htmlFor="isPublished" className="ml-3 block text-sm font-medium text-slate-300">Publish this course</label>
                </div>
                <div className="flex justify-end gap-4 pt-5 border-t border-slate-700/60">
                    <button type="button" onClick={onClose} className="py-2.5 px-6 bg-slate-700/60 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/90 transition-colors duration-200">Cancel</button>
                    <button type="submit" className="py-2.5 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-600/20">{isEditMode ? 'Save Changes' : 'Create Course'}</button>
                </div>
            </form>
        </div>
    );
};

export default CourseForm;
