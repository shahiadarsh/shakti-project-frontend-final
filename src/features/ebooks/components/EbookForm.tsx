import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch } from '../../../hooks/typedHooks';
import { addEbook } from '../ebookSlice';

interface EbookFormProps {
    onClose: () => void;
}

const EbookForm: React.FC<EbookFormProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [ebookFile, setEbookFile] = useState<File | null>(null);

    // State to hold the names of the selected files for display purposes
    const [coverImageName, setCoverImageName] = useState('No file chosen');
    const [ebookFileName, setEbookFileName] = useState('No file chosen');

    const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setCoverImage(file);
            setCoverImageName(file.name);
        }
    };

    const handleEbookFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setEbookFile(file);
            setEbookFileName(file.name);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!coverImage || !ebookFile) {
            alert('Please select both a cover image and an ebook file.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('coverImage', coverImage);
        formData.append('ebookFile', ebookFile);

        dispatch(addEbook(formData));
        onClose();
    };

    // --- STYLES FOR A MODERN, POLISHED LOOK ---
    const labelStyle = "block text-sm font-medium text-slate-400 mb-1.5";
    const inputStyle = "w-full bg-slate-900/70 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";

    return (
        // The form container with a sleek background and padding.
        <div className="bg-slate-800 px-8 py-6 rounded-b-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="ebook-title" className={labelStyle}>Title</label>
                    <input
                        id="ebook-title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className={inputStyle}
                        placeholder="e.g., The Art of Programming"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ebook-author" className={labelStyle}>Author</label>
                    <input
                        id="ebook-author"
                        type="text"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        className={inputStyle}
                        placeholder="e.g., Jane Smith"
                    />
                </div>

                {/* --- CUSTOM COVER IMAGE INPUT --- */}
                <div>
                    <label className={labelStyle}>Cover Image</label>
                    <div className="flex items-center gap-4 mt-2">
                        <input
                            type="file"
                            id="cover-image-input"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                            className="hidden" // The actual input is hidden
                            required
                        />
                        <label
                            htmlFor="cover-image-input"
                            className="cursor-pointer bg-slate-600/80 text-slate-200 font-semibold py-2 px-5 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                        >
                            Choose File
                        </label>
                        <span className="text-slate-400 text-sm truncate" title={coverImageName}>
                            {coverImageName}
                        </span>
                    </div>
                </div>
                
                {/* --- CUSTOM EBOOK FILE INPUT --- */}
                <div>
                    <label className={labelStyle}>Ebook File (PDF)</label>
                    <div className="flex items-center gap-4 mt-2">
                        <input
                            type="file"
                            id="ebook-file-input"
                            accept=".pdf"
                            onChange={handleEbookFileChange}
                            className="hidden" // The actual input is hidden
                            required
                        />
                        <label
                            htmlFor="ebook-file-input"
                            className="cursor-pointer bg-slate-600/80 text-slate-200 font-semibold py-2 px-5 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                        >
                            Choose File
                        </label>
                        <span className="text-slate-400 text-sm truncate" title={ebookFileName}>
                            {ebookFileName}
                        </span>
                    </div>
                </div>
                
                {/* --- BUTTONS --- */}
                <div className="flex justify-end items-center gap-6 pt-5 mt-4 border-t border-slate-700/60">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-200 font-semibold transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="text-white font-semibold hover:text-slate-300 transition-colors duration-200"
                    >
                        Upload Ebook
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EbookForm;