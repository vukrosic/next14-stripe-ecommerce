// // app/api/get-products/route.ts
// import { NextResponse } from 'next/server';
// import { getProductsByCategory } from '@/lib/stripe';

// export async function GET(request: Request) {
//     try {
//         let products;
//         products = await getProductsByCategory(process.env.STRIPE_PRODUCT_CATEGORY_METADATA!);

//         return NextResponse.json(products);
//     } catch (error) {
//         console.error('Error retrieving products:', error);
//         return NextResponse.json({ error: 'Failed to retrieve products' }, { status: 500 });
//     }
// }