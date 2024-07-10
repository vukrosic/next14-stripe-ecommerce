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

const Products0: React.FC<LandingPageProps> = ({ products }) => {
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
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-indigo-900 leading-tight mb-6">
                        Discover Your
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            Signature Style
                        </span>
                    </h1>
                    <p className="text-xl text-indigo-700 mb-8">
                        Elevate your wardrobe with our curated collection of trendsetting fashion.
                    </p>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105" onClick={scrollToElement}>
                        Explore Collection
                    </Button>
                </div>
                <div className="lg:w-1/2 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                    <Image
                        src='/images/model.png'
                        alt="Fashion model"
                        width={600}
                        height={600}
                        className="relative z-10 rounded-lg shadow-2xl"
                    />
                </div>
            </section>

            {/* New Arrivals Section */}
            <section id='products' className="container mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold text-center mb-12 text-indigo-900">
                    New Arrivals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Card key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-indigo-900 truncate">{product.name}</h3>
                                <p className="text-lg font-bold mb-4 text-indigo-600">
                                    {product.currency} {product.price.toFixed(2)}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => handleBuyNow(product)}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-full transition-all duration-300"
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

export default Products0;