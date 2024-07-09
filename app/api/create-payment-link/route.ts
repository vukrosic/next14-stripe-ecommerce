// app/api/create-payment-link/route.ts
import { NextResponse } from 'next/server';
import { createPaymentLink } from '@/lib/stripe';

export async function POST(request: Request) {
    try {
        const { priceId } = await request.json();
        const paymentLink = await createPaymentLink(priceId);
        return NextResponse.json({ url: paymentLink });
    } catch (error) {
        console.error('Error creating payment link:', error);
        return NextResponse.json({ error: 'Failed to create payment link' }, { status: 500 });
    }
}