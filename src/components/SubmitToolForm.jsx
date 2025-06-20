import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SuggestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: '',
    logo: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);

    try {
      const response = await fetch('https://formspree.io/f/mqabdbry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "Tool Name": formData.name,
          "Website": formData.url,
          "Description": formData.description,
          "Category": formData.category,
          "Logo": formData.logo,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          url: '',
          description: '',
          category: '',
          logo: '',
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
        Suggest a New AI Tool 🚀
      </h2>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 mb-4 bg-green-100 text-green-800 rounded"
        >
          ✅ Thank you! Your tool was submitted successfully.
        </motion.div>
      )}

      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-800 rounded">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Tool Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        />

        <input
          type="url"
          name="url"
          placeholder="Tool Website (https://...)"
          required
          value={formData.url}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        />

        <textarea
          name="description"
          placeholder="What does this tool do?"
          required
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        />

        <select
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        >
          <option value="">Select Category</option>
          <option value="Writing">Writing</option>
          <option value="Design">Design</option>
          <option value="Productivity">Productivity</option>
          <option value="SEO">SEO</option>
          <option value="Code">Code</option>
          <option value="Video">Video</option>
          <option value="Voice">Voice</option>
          <option value="Music">Music</option>
        </select>

        <input
          type="url"
          name="logo"
          placeholder="Optional: Logo Image URL"
          value={formData.logo}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        />

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-all"
        >
          Submit Tool
        </button>
      </form>

      {/* 🔍 Preview section */}
      {(formData.name || formData.url || formData.description) && (
        <div className="mt-6 p-4 border rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <h3 className="text-xl font-semibold mb-1 text-zinc-900 dark:text-white">
            {formData.name || "Tool Name"}
          </h3>
          <p className="text-sm mb-2 text-zinc-700 dark:text-zinc-300">
            {formData.description || "Tool description preview..."}
          </p>
          {formData.url && (
            <a
              href={formData.url}
              target="_blank"
              rel="noreferrer"
              className="text-violet-600 hover:underline text-sm"
            >
              {formData.url}
            </a>
          )}
          {formData.logo && (
            <img
              src={formData.logo}
              alt="Logo preview"
              className="mt-4 h-20 object-contain rounded"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestForm;
