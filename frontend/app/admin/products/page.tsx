
'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    description?: string;
    stock?: number;
    featured?: boolean;
};

export default function AdminProductsPage() {
    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('Fruits');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [featured, setFeatured] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/products');
                if (!res.ok) return;
                const data = await res.json();
                const loaded: Product[] = (data.products ?? []).map((p: any) => ({
                    id: p.id as string,
                    name: p.name as string,
                    price: p.price as number,
                    category: p.category as string,
                    imageUrl: p.imageUrl as string,
                    description: p.description as string | undefined,
                    stock: typeof p.stock === 'number' ? p.stock : undefined,
                    featured: !!p.featured,
                }));
                setProducts(loaded);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setImageFile(file);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            let imagePath = '';

            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    throw new Error('Failed to upload image');
                }

                const data = await res.json();
                imagePath = data.url as string;
            }

            if (editingProductId === null) {
                const res = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        description,
                        price: Number(price) || 0,
                        imageUrl: imagePath,
                        category,
                        stock: stock === '' ? undefined : Number(stock) || 0,
                        featured,
                    }),
                });

                if (!res.ok) {
                    let message = 'Failed to save product';
                    try {
                        const errBody = await res.json();
                        if (errBody) {
                            if (typeof errBody.detail === 'string') {
                                message = errBody.detail;
                            } else if (typeof errBody.error === 'string') {
                                message = errBody.error;
                            }
                        }
                    } catch {
                        // ignore parse error
                    }
                    throw new Error(message);
                }

                const data = await res.json();
                const created = data.product as any;
                setProducts((prev) => [
                    {
                        id: created.id,
                        name: created.name,
                        price: created.price,
                        category: created.category,
                        imageUrl: created.imageUrl,
                        description: created.description,
                        stock: created.stock,
                        featured: created.featured,
                    },
                    ...prev,
                ]);
            } else {
                const res = await fetch('/api/products', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: editingProductId,
                        name,
                        description,
                        price: Number(price) || 0,
                        imageUrl: imagePath || undefined,
                        category,
                        stock: stock === '' ? undefined : Number(stock) || 0,
                        featured,
                    }),
                });

                if (!res.ok) {
                    let message = 'Failed to update product';
                    try {
                        const errBody = await res.json();
                        if (errBody) {
                            if (typeof errBody.detail === 'string') {
                                message = errBody.detail;
                            } else if (typeof errBody.error === 'string') {
                                message = errBody.error;
                            }
                        }
                    } catch {
                        // ignore parse error
                    }
                    throw new Error(message);
                }

                const data = await res.json();
                const updated = data.product as any;
                setProducts((prev) =>
                    prev.map((product) =>
                        product.id === updated.id
                            ? {
                                id: updated.id,
                                name: updated.name,
                                price: updated.price,
                                category: updated.category,
                                imageUrl: updated.imageUrl,
                                description: updated.description,
                                stock: updated.stock,
                                featured: updated.featured,
                            }
                            : product,
                    ),
                );
            }

            setShowForm(false);
            setEditingProductId(null);
            setName('');
            setPrice('');
            setStock('');
            setCategory('Fruits');
            setDescription('');
            setImageFile(null);
            setFeatured(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (product: Product) => {
        setShowForm(true);
        setEditingProductId(product.id);
        setName(product.name);
        setPrice(product.price.toString());
        setStock(product.stock != null ? product.stock.toString() : '');
        setCategory(product.category);
        setDescription(product.description ?? '');
        setImageFile(null);
        setFeatured(!!product.featured);
    };

    const handleDelete = async (id: string) => {
        setError(null);
        try {
            const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Failed to delete product');
            }
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        }
    };

    const renderProductImage = (image: string) => {
        if (image.startsWith('http') || image.startsWith('/')) {
            return <img src={image} alt="Product" className="w-8 h-8 rounded object-cover" />;
        }
        return <span className="text-2xl">{image}</span>;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-primary">Product Management</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary text-accent px-6 py-2 rounded font-semibold hover:bg-primary-dark transition"
                >
                    {showForm ? 'Cancel' : '➕ Add Product'}
                </button>
            </div>

            {/* Add Product Form */}
            {showForm && (
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 className="text-xl font-bold text-primary mb-6">
                        {editingProductId === null ? 'Add New Product' : 'Edit Product'}
                    </h3>
                    <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-primary font-semibold mb-2">Product Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-primary font-semibold mb-2">Price</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-primary font-semibold mb-2">Number of Items (Stock)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                    placeholder="e.g. 20"
                                />
                            </div>
                            <div>
                                <label className="block text-primary font-semibold mb-2">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                >
                                    <option>Fruits</option>
                                    <option>Vegetables</option>
                                    <option>Dairy</option>
                                    <option>Grains</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-primary font-semibold mb-2">Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-6 md:mt-8">
                                <input
                                    id="featured"
                                    type="checkbox"
                                    checked={featured}
                                    onChange={(e) => setFeatured(e.target.checked)}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="featured" className="text-primary font-semibold">
                                    Mark as Featured (show on homepage)
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-primary font-semibold mb-2">Description</label>
                            <textarea
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            ></textarea>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary text-accent px-6 py-2 rounded font-semibold hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {isSubmitting ? 'Saving...' : editingProductId === null ? 'Add Product' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-primary text-accent">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">Product Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Category</th>
                            <th className="px-6 py-3 text-left font-semibold">Price</th>
                            <th className="px-6 py-3 text-left font-semibold">Stock</th>
                            <th className="px-6 py-3 text-left font-semibold">Featured</th>
                            <th className="px-6 py-3 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && products.length === 0 && (
                            <tr>
                                <td className="px-6 py-4 text-gray-500" colSpan={4}>
                                    Loading products...
                                </td>
                            </tr>
                        )}
                        {products.map((product) => (
                            <tr key={product.id} className="border-t hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {renderProductImage(product.imageUrl)}
                                        {product.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4 font-semibold">${product.price}</td>
                                <td className="px-6 py-4">{product.stock ?? '-'}</td>
                                <td className="px-6 py-4">
                                    {product.featured ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-accent">
                                            Featured
                                        </span>
                                    ) : (
                                        <span className="text-xs text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="text-primary hover:underline mr-4"
                                        onClick={() => handleEdit(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
