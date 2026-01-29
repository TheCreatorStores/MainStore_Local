import { createProduct } from '@/lib/printify';

export async function POST(req: Request) {
  const { imageId } = await req.json();
  try {
    const result = await createProduct(imageId);
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
