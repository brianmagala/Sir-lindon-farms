'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

interface SliderItem {
    filename: string;
    url: string;
    name: string;
}

export default function AdminSliderPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<SliderItem[]>([]);

    const loadSlider = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/slider');
            if (!res.ok) return;
            const data = await res.json();
            const loaded: SliderItem[] = (data.items ?? []).map((item: any) => ({
                filename: item.filename as string,
                url: item.url as string,
                name: item.name as string,
            }));
            setItems(loaded);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSlider();
    }, []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0] ?? null;
        setFile(selected);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!file) {
            setError('Please select a file.');
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/slider-upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Upload failed');
            }

            setFile(null);
            // Reset the file input
            const fileInput = document.getElementById('slider-file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            await loadSlider();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (filename: string) => {
        if (!confirm('Delete this slider image?')) return;
        try {
            const res = await fetch(`/api/slider?file=${encodeURIComponent(filename)}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Delete failed');

            setItems(items.filter((item) => item.filename !== filename));
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Achievements Slider Management</h1>
            <p className="text-gray-600 mb-8">
                Upload images here to change the pictures displayed on the Achievements section sliding gallery on the home page.
            </p>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
                {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">{error}</div>}

                <div className="flex items-end gap-6 border-2 border-dashed border-gray-300 p-6 rounded-lg">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
                        <input
                            id="slider-file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary file:text-white
                                hover:file:bg-primary-dark"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isUploading || !file}
                        className="bg-accent text-primary px-6 py-2 rounded-lg font-semibold hover:bg-accent-light disabled:opacity-50 transition"
                    >
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                </div>
            </form>

            {isLoading ? (
                <div className="text-center py-12">Loading images...</div>
            ) : items.length === 0 ? (
                <div className="bg-gray-50 text-center py-12 rounded-lg border border-gray-200 text-gray-500">
                    No images in the slider yet. The home page will use the default images.
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.filename} className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow transition">
                            <div className="aspect-video relative overflow-hidden bg-gray-100">
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate mb-4" title={item.filename}>{item.filename}</p>
                                <button
                                    onClick={() => handleDelete(item.filename)}
                                    className="w-full text-red-600 border border-red-200 hover:bg-red-50 py-1.5 rounded-md text-sm transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
