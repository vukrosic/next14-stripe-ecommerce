// app/api/add-product/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
    try {
        const { name, description, amount, currency, images } = await request.json();

        // Create a product with metadata
        const product = await stripe.products.create({
            name,
            description,
            images,
            metadata: {
                category: process.env.STRIPE_PRODUCT_CATEGORY_METADATA!
            }
        });

        // Create a price for the product
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: amount * 100, // Stripe uses cents
            currency,
        });

        // Update the product with the default price
        await stripe.products.update(product.id, {
            default_price: price.id,
        });

        return NextResponse.json({ product, price });
    } catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}