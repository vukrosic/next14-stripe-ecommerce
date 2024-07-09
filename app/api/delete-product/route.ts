// app/api/delete-product/route.ts
import { NextResponse } from 'next/server';
import { deleteProduct } from '@/lib/stripe';

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (!productId) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    try {
        const deletedProduct = await deleteProduct(productId);
        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}