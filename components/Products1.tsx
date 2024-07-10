"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";

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

const Products1: React.FC<LandingPageProps> = ({ products }) => {
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
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold text-gray-800 mb-6">
                        Elevate Your Style
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Discover our handpicked collection of premium fashion pieces designed to make you stand out.
                    </p>
                    <Button
                        className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-md text-lg font-semibold transition-all duration-300"
                        onClick={scrollToElement}
                    >
                        View Collection
                    </Button>
                </div>
            </section>

            {/* Products Section */}
            <section id='products' className="container mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    Featured Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <Card key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                                <p className="text-lg font-bold text-teal-600">
                                    {product.currency} {product.price.toFixed(2)}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => handleBuyNow(product)}
                                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-md transition-all duration-300"
                                    disabled={isLoading === product.id}
                                >
                                    {isLoading === product.id ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="mr-2 h-5 w-5" />
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

export default Products1;