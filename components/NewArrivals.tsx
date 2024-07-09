"use client";

import React, { useState } from 'react';

interface Product {
    id: string;
    name: string;
    images: string[];
    price: number;
    currency: string;
    priceId: string;
}

interface NewArrivalsProps {
    products: Product[];
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const handleBuyNow = async (product: Product) => {
        setIsLoading(product.id);
        try {
            const response = await fetch('/api/create-payment-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId: product.priceId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment link');
            }

            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            console.error('Error creating payment link:', error);
            alert('Failed to create payment link. Please try again.');
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <section className="container mx-auto px-4 py-12 text-black p-14">
            <h2 className="text-4xl font-black mb-8 relative pl-14">
                NEW ARRIVALS
                <span className="absolute -top-2 left-0 bg-yellow-300 h-4 w-16 -z-10 transform -skew-x-12"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-14 pt-10">
                {products.map((product) => (
                    <div key={product.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            width={400}
                            height={500}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-lg font-bold mb-2 flex space-x-2">
                                <span className='uppercase'>{product.currency}</span>
                                <span>{product.price.toFixed(2)}</span>
                            </p>
                            <button
                                onClick={() => handleBuyNow(product)}
                                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300"
                                disabled={isLoading === product.id}
                            >
                                {isLoading === product.id ? 'Loading...' : 'Buy Now'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;