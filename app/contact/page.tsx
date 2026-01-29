'use client';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'Sent!' : 'Error');
  };

  return (
    <div className="bg-black text-white p-8 flex justify-center">
      <form onSubmit={handleSubmit} className="w-1/2">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="block w-full mb-4 p-2 bg-white text-black rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="block w-full mb-4 p-2 bg-white text-black rounded"
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="block w-full mb-4 p-2 bg-white text-black rounded h-32"
        />
        <button type="submit" className="bg-black text-white px-6 py-3 w-full rounded border border-white">Send Message</button>
        <p>{status}</p>
      </form>
    </div>
  );
}
