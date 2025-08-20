// Contact.jsx or Contact.js
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In production, send this to your backend or form handler (e.g., Nodemailer, Formspree)
    console.log('Send this to contributors@voiceofafrica.co.uk:', formData);

    // Reset form or show thank you
    alert("Message sent! We’ll be in touch.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <MainLayout>
    <section className="max-w-xl px-4 py-8 mx-auto">
      <h2 className="text-2xl tracking-[.4em] mb-4 font-bold text-[#5eeccc]">
        Contact: VoiceofAfrica
        </h2>
      <p className="mb-6 text-gray-200">
        <strong>Contributors Welcome</strong> | We’re always on the lookout for top quality UK content writers.
        Please submit the form or write to <a href="mailto:contributors@voiceofafrica.co.uk" className="text-blue-600 underline">contributors@voiceofafrica.co.uk</a>.
      </p>
      <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-gray-800 rounded-md shadow-md">
        <div>
          {/* <label className="block mb-1 font-medium">Name</label> */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-700 rounded"
            placeholder="Your name"
          />
        </div>
        <div>
          {/* <label className="block mb-1 font-medium">Email</label> */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-700 rounded"
            placeholder="your@email.com"
          />
        </div>
        <div>
          {/* <label className="block mb-1 font-medium">Message</label> */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-3 py-2 border border-gray-700 rounded resize-none"
            placeholder="Tell us why you're interested..."
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-black bg-[#5eeccc] rounded hover:bg-[#1be415] cursor-pointer"
        >
          Submit
        </button>
      </form>
    </section>
    </MainLayout>
  );
};

export default Contact;