// components/ProductList.tsx
'use client';

import { useState } from 'react';
import { Product } from '@/types/product';

type ProductListProps = {
    products: Product[];
};

export default function ProductList({ products: initialProducts }: ProductListProps) {
    const [products, setProducts] = useState(initialProducts);

    const handleDelete = async (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                console.log("productId = " + productId);
                const response = await fetch(`/api/delete-product?id=${productId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setProducts(products.filter(product => product.id !== productId));
                } else {
                    throw new Error('Failed to delete product');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product. Please try again.');
            }
        }
    };

    return (
        <div className="space-y-4">
            {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                    <div>
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-500">{product.price} {product.currency}</p>
                    </div>
                    <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}