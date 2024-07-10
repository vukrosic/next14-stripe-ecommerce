"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, ArrowDown } from "lucide-react";

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

const Products4: React.FC<LandingPageProps> = ({ products }) => {
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
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <h1 className="text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                        Neon Blaze
                    </h1>
                    <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Illuminate your style with our cutting-edge neon-inspired collection. Stand out in the urban jungle.
                    </p>
                    <Button
                        className="bg-teal-400 hover:bg-teal-500 text-gray-900 px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-300/50"
                        onClick={scrollToElement}
                    >
                        Explore Collection
                    </Button>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ArrowDown size={32} className="text-teal-400" />
                </div>
            </section>

            {/* Products Section */}
            <section id='products' className="container mx-auto px-4 py-24">
                <h2 className="text-5xl font-black text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                    Neon Essentials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <Card key={product.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-teal-500/30 border-2 border-teal-500/20">
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-500 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 hover:opacity-75 transition-opacity duration-300" />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-2xl font-bold mb-2 text-teal-400">{product.name}</h3>
                                <p className="text-3xl font-black text-blue-400">
                                    {product.currency} {product.price.toFixed(2)}
                                </p>
                            </CardContent>
                            <CardFooter className="px-6 pb-6">
                                <Button
                                    onClick={() => handleBuyNow(product)}
                                    className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-400/50 text-lg"
                                    disabled={isLoading === product.id}
                                >
                                    {isLoading === product.id ? (
                                        <>
                                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="mr-2 h-6 w-6" />
                                            Buy Now
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

export default Products4;