import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch } from '../../../hooks/typedHooks';
import { addAudio } from '../audioSlice';
import { UploadCloud } from 'lucide-react';

interface AudioFormProps {
    onClose: () => void;
}

const AudioForm: React.FC<AudioFormProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setAudioFile(file);
            setFileName(file.name);
        } else {
            setAudioFile(null);
            setFileName('No file chosen');
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!audioFile) {
            alert('Please select an audio file.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('audioFile', audioFile);

        dispatch(addAudio(formData));
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
                    <label htmlFor="audio-title" className={labelStyle}>Title</label>
                    <input
                        id="audio-title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className={inputStyle}
                        placeholder="e.g., Podcast Episode 1"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="audio-artist" className={labelStyle}>Artist</label>
                    <input
                        id="audio-artist"
                        type="text"
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                        className={inputStyle}
                        placeholder="e.g., John Doe"
                    />
                </div>

                {/* --- CUSTOM FILE INPUT --- */}
                <div>
                    <label className={labelStyle}>Audio File</label>
                    <div className="flex items-center gap-4 mt-2">
                        <input
                            type="file"
                            id="audio-file-input"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="hidden" // The actual input is hidden
                            required
                        />
                        {/* This label acts as the custom button */}
                        <label
                            htmlFor="audio-file-input"
                            className="cursor-pointer bg-slate-600/80 text-slate-200 font-semibold py-2 px-5 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                        >
                            Choose File
                        </label>
                        <span className="text-slate-400 text-sm truncate" title={fileName}>
                            {fileName}
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
                        Upload Audio
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AudioForm;