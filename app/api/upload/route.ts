import { uploadImage } from '@/lib/printify';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  try {
    const result = await uploadImage(file);
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
