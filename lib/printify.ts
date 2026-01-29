export async function fetchProducts() {
  const response = await fetch(`https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/products.json`, {
    headers: {
      Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch products');
  const { data } = await response.json();
  return data;
}

export async function getCategories(products: any[]) {
  const categories = new Map<string, any[]>();
  products.forEach((product) => {
    const lines = product.description.split('\n').filter(Boolean);
    let category = lines.pop()?.trim().replace(/\.$/, '') || 'Uncategorized';
    if (!categories.has(category)) categories.set(category, []);
    categories.get(category)!.push(product);
  });
  return categories;
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`https://api.printify.com/v1/uploads/images.json`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
    },
    body: formData,
  });
  return await response.json();
}

export async function createProduct(imageId: string) {
  // Default to a simple mug blueprint for demo; customize
  const body = {
    title: 'Custom Uploaded Product',
    description: 'Custom design\nMug.', // Ends with category
    blueprint_id: 68, // Mug example
    print_provider_id: 9,
    variants: [{ id: 33719, price: 1499, is_enabled: true }],
    print_areas: [{
      variant_ids: [33719],
      placeholders: [{ position: 'front', images: [{ id: imageId, x: 0.5, y: 0.5, scale: 1, angle: 0 }] }],
    }],
  };
  const response = await fetch(`https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/products.json`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

export async function createOrder(paymentId: string, productId: string, variantId: number) {
  // Demo address; customize with user input
  const body = {
    external_id: paymentId,
    line_items: [{ product_id: productId, variant_id: variantId, quantity: 1 }],
    shipping_method: 1,
    send_shipping_notification: true,
    address_to: {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      country: 'GB',
      region: '',
      address1: 'Birkenhead Street',
      address2: '',
      city: 'Birkenhead',
      zip: 'CH41',
    },
  };
  const response = await fetch(`https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/orders.json`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}
