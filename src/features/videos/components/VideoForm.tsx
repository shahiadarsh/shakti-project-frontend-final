import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch } from '../../../hooks/typedHooks';
import { addVideo } from '../videoSlice';
import { UploadCloud } from 'lucide-react';

interface VideoFormProps {
    onClose: () => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sequenceOrder, setSequenceOrder] = useState(1);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setVideoFile(file);
            setFileName(file.name);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!videoFile) {
            alert('Please select a video file.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('sequenceOrder', sequenceOrder.toString());
        formData.append('videoFile', videoFile);

        dispatch(addVideo(formData));
        onClose();
    };

    // --- STYLES TO MATCH THE SCREENSHOT PERFECTLY ---
    const labelStyle = "block text-sm font-medium text-slate-400 mb-1.5";
    const inputStyle = "w-full bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";

    return (
        // The form container now has the exact background color and padding from the image.
        <div className="bg-slate-800 px-8 py-6 rounded-b-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="video-title" className={labelStyle}>Title</label>
                    <input
                        id="video-title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className={inputStyle}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="video-description" className={labelStyle}>Description</label>
                    <textarea
                        id="video-description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className={`${inputStyle} min-h-[100px]`}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sequence-order" className={labelStyle}>Sequence Order</label>
                    <input
                        id="sequence-order"
                        type="number"
                        value={sequenceOrder}
                        onChange={e => setSequenceOrder(Number(e.target.value))}
                        className={inputStyle}
                        required
                        min="1"
                    />
                </div>

                {/* --- CUSTOM FILE INPUT --- */}
                <div>
                    <label className={labelStyle}>Video File</label>
                    <div className="flex items-center gap-4 mt-2">
                        <input
                            type="file"
                            id="video-file-input"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="hidden" // The actual input is hidden
                            required
                        />
                        {/* This label acts as the custom button */}
                        <label
                            htmlFor="video-file-input"
                            className="cursor-pointer bg-slate-200 text-slate-800 font-semibold py-2 px-5 rounded-lg hover:bg-slate-300 transition-colors duration-200"
                        >
                            Choose File
                        </label>
                        <span className="text-slate-400 text-sm truncate">{fileName}</span>
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
                        Upload Video
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VideoForm;