'use client';
import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
    const { id } = await uploadRes.json();
    const createRes = await fetch('/api/create-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageId: id }),
    });
    setMessage(createRes.ok ? 'Product created!' : 'Error');
  };

  return (
    <div className="bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Upload Your Design</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-4" />
      <button onClick={handleUpload} className="bg-white text-black px-6 py-3 rounded">Upload and Create</button>
      <p>{message}</p>
    </div>
  );
}
