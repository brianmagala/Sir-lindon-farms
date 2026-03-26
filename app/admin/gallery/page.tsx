'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

interface GalleryItem {
    filename: string;
    url: string;
    name: string;
    uploadedAt?: string;
}

export default function AdminGalleryPage() {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<GalleryItem[]>([]);

    useEffect(() => {
        const loadGallery = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/gallery');
                if (!res.ok) return;
                const data = await res.json();
                const loaded: GalleryItem[] = (data.items ?? []).map((item: any) => ({
                    filename: item.filename as string,
                    url: item.url as string,
                    name: (item.name as string) || (item.filename as string),
                }));
                setItems(loaded);
            } finally {
                setIsLoading(false);
            }
        };

        loadGallery();
    }, []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0] ?? null;
        setFile(selected);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!file) {
            setError('Please choose an image to upload.');
            return;
        }

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/gallery-upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Upload failed');
            }

            const data = await res.json();
            const filename: string = (data.fileName as string) || (data.url as string)?.split('/').pop() || '';

            const newItem: GalleryItem = {
                filename,
                url: data.url as string,
                name: title || file.name,
                uploadedAt: new Date().toISOString(),
            };

            setItems((prev) => [newItem, ...prev]);
            setFile(null);
            setTitle('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (item: GalleryItem) => {
        setError(null);
        try {
            const res = await fetch(`/api/gallery?file=${encodeURIComponent(item.filename)}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Failed to delete image');
            }
            setItems((prev) => prev.filter((i) => i.filename !== item.filename));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-primary">Gallery Management</h2>
                <p className="text-gray-600 text-sm">Upload images that will appear on the public gallery page.</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow p-6 space-y-4 max-w-xl"
                encType="multipart/form-data"
            >
                <div>
                    <label className="block text-primary font-semibold mb-2">Image Title (optional)</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        placeholder="Sunrise over the fields"
                    />
                </div>
                <div>
                    <label className="block text-primary font-semibold mb-2">Select Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
                    <p className="text-xs text-gray-500 mt-1">Supported: common image formats (JPG, PNG, etc.).</p>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={isUploading}
                    className="bg-primary text-accent px-6 py-2 rounded font-semibold hover:bg-primary-dark transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isUploading ? 'Uploading...' : 'Upload to Gallery'}
                </button>
            </form>

            {isLoading && items.length === 0 && (
                <p className="text-gray-500">Loading gallery images...</p>
            )}

            {items.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Recently Uploaded (this session)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {items.map((item) => (
                            <div key={item.filename} className="bg-white rounded-lg shadow p-3 flex flex-col gap-2">
                                <div className="relative w-full h-40 overflow-hidden rounded-md bg-gray-100">
                                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="font-semibold text-primary truncate">{item.name}</p>
                                {item.uploadedAt && (
                                    <p className="text-xs text-gray-500">Uploaded just now</p>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDelete(item)}
                                    className="self-start mt-1 text-xs text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
