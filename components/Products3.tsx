"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag, ChevronDown } from "lucide-react";

interface Product {
    id: string;
    name: string;
    images: string[];
    price: number;
    currency: string;
    priceId: string;
}

interface LandingPageProps {
    products: Product[];
}

const Products3: React.FC<LandingPageProps> = ({ products }) => {
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
        }
    };

    const scrollToElement = () => {
        const element = document.getElementById("products");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <h1 className="text-6xl font-black mb-8 animate-pulse">
                        <span className="text-yellow-400">Futuristic</span> <span className="text-pink-400">Fashion</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Experience the intersection of style and innovation with our avant-garde collection. Redefine your look, embrace the future.
                    </p>
                    <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-300/50"
                        onClick={scrollToElement}
                    >
                        Discover Collection
                    </Button>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown size={32} className="text-gray-300" />
                </div>
            </section>

            {/* Products Section */}
            <section id='products' className="container mx-auto px-4 py-24">
                <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                    Featured Innovations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Card key={product.id} className="bg-gradient-to-br from-indigo-800 to-purple-800 rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/30">
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-500 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-0 hover:opacity-75 transition-opacity duration-300" />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-yellow-400">{product.name}</h3>
                                <p className="text-2xl font-black text-pink-400">
                                    {product.currency} {product.price.toFixed(2)}
                                </p>
                            </CardContent>
                            <CardFooter className="px-6 pb-6">
                                <Button
                                    onClick={() => handleBuyNow(product)}
                                    className="w-full bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-indigo-900 font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-400/50"
                                    disabled={isLoading === product.id}
                                >
                                    {isLoading === product.id ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="mr-2 h-5 w-5" />
                                            Acquire Now
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Products3;