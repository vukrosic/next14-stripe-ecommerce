import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
    return (
        <header className="bg-white text-black shadow-sm">
            <nav className="pt-16 pl-16 flex">
                <div className='flex space-x-2'>
                    {/* Add navigation items here */}
                    <Image src='logo.svg' width={32} height={30} alt='logo' />
                    <p className='font-black text-3xl'>FASHION</p>
                </div>
                <Link className='mr-4 ml-auto text-center' href={'/add-product'}>Add Product</Link>
            </nav>
        </header>
    )
}

export default Header