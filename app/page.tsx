import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import NewArrivals from '@/components/NewArrivals'
import { getProductsByCategory } from '@/lib/stripe';
import Head from 'next/head'


export default async function Home() {
  const products = await getProductsByCategory();
  console.log(products);
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Unique Clothes Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <HeroSection />
        <NewArrivals products={products} />
      </main>
    </div>
  )
}

