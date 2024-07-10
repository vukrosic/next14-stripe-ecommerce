"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

const NewArrivals1: React.FC<NewArrivalsProps> = ({ products }) => {
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
        <section className="container mx-auto px-4 py-16 text-gray-800">
            <h2 className="text-4xl font-extrabold mb-12 text-center">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                    NEW ARRIVALS
                </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl">
                        <div className="relative aspect-square overflow-hidden">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <CardContent className="p-4">
                            <h3 className="text-xl font-semibold mb-2 truncate">{product.name}</h3>
                            <p className="text-lg font-bold mb-2 flex items-center space-x-1">
                                <span className="uppercase text-sm text-gray-500">{product.currency}</span>
                                <span>{product.price.toFixed(2)}</span>
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => handleBuyNow(product)}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                disabled={isLoading === product.id}
                            >
                                {isLoading === product.id ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : (
                                    'Buy Now'
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals1;