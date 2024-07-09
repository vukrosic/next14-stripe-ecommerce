import React from 'react'
import Image from 'next/image'

const brands = [
    { name: 'H&M', logo: '/images/H&M.png' },
    { name: 'OBEY', logo: '/images/Obey.png' },
    { name: 'Shopify', logo: '/images/shopify.webp' },
    { name: 'Mountain', logo: '/images/mountain.png' },
    { name: "BMW", logo: '/images/BMW.png' },
    { name: 'Amazon', logo: '/images/Amazon.svg' },
]

const BrandBar: React.FC = () => {
    return (
        <div className="bg-yellow-200 py-6">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {brands.map((brand) => (
                    <Image
                        key={brand.name}
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={100}
                        height={50}
                    />
                ))}
            </div>
        </div>
    )
}

export default BrandBar