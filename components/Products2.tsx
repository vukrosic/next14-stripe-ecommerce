"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";

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

const Products2: React.FC<LandingPageProps> = ({ products }) => {
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
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-24">
                <div className="text-center mb-20">
                    <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
                        Fashion Forward
                    </h1>
                    <p className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        Step into the future of fashion with our cutting-edge collection. Be bold, be you.
                    </p>
                    <Button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105"
                        onClick={scrollToElement}
                    >
                        Explore Now
                    </Button>
                </div>
            </section>

            {/* Products Section */}
            <section id='products' className="container mx-auto px-4 py-24">
                <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Trending Items
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {products.map((product) => (
                        <Card key={product.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                            <div className="relative aspect-square overflow-hidden group">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                            </div>
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-3 text-gray-100">{product.name}</h3>
                                <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                    {product.currency} {product.price.toFixed(2)}
                                </p>
                            </CardContent>
                            <CardFooter className="px-8 pb-8">
                                <Button
                                    onClick={() => handleBuyNow(product)}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                                    disabled={isLoading === product.id}
                                >
                                    {isLoading === product.id ? (
                                        <>
                                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="mr-2 h-6 w-6" />
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

export default Products2;