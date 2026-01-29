import { Client } from 'square';
import { createOrder } from '@/lib/printify';

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox', // Change to 'production'
});

export async function POST(req: Request) {
  const { token, amount, productId, variantId } = await req.json();
  try {
    const resp = await paymentsApi.createPayment({
      sourceId: token,
      amountMoney: { amount: BigInt(amount), currency: 'USD' },
      idempotencyKey: crypto.randomUUID(),
    });
    if (resp.result.payment?.status === 'COMPLETED') {
      await createOrder(resp.result.payment.id, productId, variantId);
    }
    return Response.json(resp.result);
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
