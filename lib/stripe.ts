// lib/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

// export async function getProductById(id: string) {
//     const product = await stripe.products.retrieve(id);
//     const price = await stripe.prices.retrieve(product.default_price as string);

//     return {
//         id: product.id,
//         name: product.name,
//         images: product.images,
//         price: price.unit_amount! / 100,
//         currency: price.currency,
//         priceId: price.id,
//     };
// }

export async function createPaymentLink(priceId: string) {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        shipping_address_collection: {
            allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW'],
        }
    });

    return session.url;
}


export async function addProduct(name: string, description: string, amount: number, currency: string, images: string[], category: string) {
    const product = await stripe.products.create({
        name,
        description,
        images,
        metadata: {
            category: category
        }
    });

    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amount * 100,
        currency,
    });

    await stripe.products.update(product.id, {
        default_price: price.id,
    });

    return { product, price };
}

export async function getProductsByCategory() {
    const products = await stripe.products.search({
        query: `metadata['category']:'${process.env.STRIPE_PRODUCT_CATEGORY_METADATA!}' AND active:'true'`,
    });

    const productDetails = await Promise.all(products.data.map(async (product) => {
        const price = await stripe.prices.retrieve(product.default_price as string);
        return {
            id: product.id,
            name: product.name,
            images: product.images,
            price: price.unit_amount! / 100,
            currency: price.currency,
            priceId: price.id,
            category: product.metadata.category,
        };
    }));

    return productDetails;
}


export async function deleteProduct(productId: string) {
    try {
        const deletedProduct = await stripe.products.update(productId, {
            active: false
        });
        // const deletedProduct = await stripe.products.del(productId);
        return deletedProduct;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// export async function getAllProducts() {
//     const products = await stripe.products.list({
//         limit: 100, // adjust as needed
//         active: true,
//     });

//     const productDetails = await Promise.all(products.data.map(async (product) => {
//         const price = await stripe.prices.retrieve(product.default_price as string);
//         return {
//             id: product.id,
//             name: product.name,
//             images: product.images,
//             price: price.unit_amount! / 100,
//             currency: price.currency,
//             priceId: price.id,
//             category: product.metadata.category,
//         };
//     }));

//     return productDetails;
// }