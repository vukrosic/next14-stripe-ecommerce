import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import NewArrivals1 from '@/components/NewArriavls1';
import NewArrivals from '@/components/NewArrivals'
import Products0 from '@/components/Products0';
import Products1 from '@/components/Products1';
import Products2 from '@/components/Products2';
import Products3 from '@/components/Products3';
import Products4 from '@/components/Products4';
import { getProducts } from '@/lib/stripe';
import Head from 'next/head'


export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <Products0 products={products} />
      {/* <Products1 products={products} /> */}
      {/* <Products2 products={products} /> */}
      {/* <Products3 products={products} /> */}
      {/* <Products4 products={products} /> */}
      {/* <NewArrivals1 products={products} /> */}
    </main>
  )
}

