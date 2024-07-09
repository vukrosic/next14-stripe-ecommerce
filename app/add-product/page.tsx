// // app/add-product/page.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';


// export default function AddProduct() {

//     const router = useRouter();
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [amount, setAmount] = useState('');
//     const [currency, setCurrency] = useState('usd');
//     const [image, setImage] = useState('');

//     const [disabled, setDisabled] = useState(false);


//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             setDisabled(true);
//             const response = await fetch('/api/add-product', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     name,
//                     description,
//                     amount: parseFloat(amount),
//                     currency,
//                     images: [image],
//                 }),
//             });

//             if (response.ok) {
//                 alert('Product added successfully!');
//                 router.push('/'); // Redirect to home page or product list
//             } else {
//                 throw new Error('Failed to add product');
//             }
//         } catch (error) {
//             console.error('Error adding product:', error);
//             alert('Failed to add product. Please try again.');
//         } finally {
//             setDisabled(false);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10">
//             <h1 className="text-2xl font-bold mb-5">Add New Product</h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="name" className="block mb-1">Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="description" className="block mb-1">Description</label>
//                     <textarea
//                         id="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded"
//                     ></textarea>
//                 </div>
//                 <div>
//                     <label htmlFor="amount" className="block mb-1">Price</label>
//                     <input
//                         type="number"
//                         id="amount"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         required
//                         min="0"
//                         step="0.01"
//                         className="w-full px-3 py-2 border rounded"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="currency" className="block mb-1">Currency</label>
//                     <select
//                         id="currency"
//                         value={currency}
//                         onChange={(e) => setCurrency(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded"
//                     >
//                         <option value="usd">USD</option>
//                         <option value="eur">EUR</option>
//                         <option value="gbp">GBP</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="image" className="block mb-1">Image URL</label>
//                     <input
//                         type="url"
//                         id="image"
//                         value={image}
//                         onChange={(e) => setImage(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded"
//                     />
//                 </div>
//                 <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" disabled={disabled}>
//                     Add Product
//                 </button>
//             </form>
//         </div>
//     );
// }