import { notFound } from 'next/navigation';
import { fetchProducts } from '@/lib/printify';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const products = await fetchProducts();
  const product = products.find((p: any) => p.id === params.id);
  if (!product) notFound();

  const processPayment = async (token: any) => {
    'use server';
    const response = await fetch('/api/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token.token, amount: product.variants[0].price, productId: product.id, variantId: product.variants[0].id }),
    });
    return await response.json();
  };

  return (
    <div className="bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
      <img src={product.images[0]?.src} alt={product.title} className="h-64 w-auto mb-4" />
      <p className="mb-4">{product.description}</p>
      <p className="text-2xl font-bold mb-6">${(product.variants[0]?.price / 100).toFixed(2)}</p>
      <PaymentForm
        applicationId={process.env.SQUARE_APPLICATION_ID!}
        locationId={process.env.SQUARE_LOCATION_ID!}
        cardTokenizeResponseReceived={async (token) => {
          const result = await processPayment(token);
          console.log(result); // Handle success/failure
        }}
      >
        <CreditCard />
      </PaymentForm>
    </div>
  );
}
