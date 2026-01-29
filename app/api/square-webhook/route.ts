import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('x-square-signature');
  const url = new URL(req.url).origin + '/api/square-webhook'; // Full URL

  // Verify signature
  const hmac = crypto.createHmac('sha256', process.env.SQUARE_WEBHOOK_SECRET!);
  hmac.update(url + body);
  const computedSig = hmac.digest('base64');

  if (computedSig !== signature) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);
  if (event.type === 'payment.updated' && event.data.object.payment.status === 'COMPLETED') {
    // Already handled in pay, but can add extra logic
    console.log('Payment completed:', event.data.object.payment.id);
  }

  return Response.json({ received: true });
}
