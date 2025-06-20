import React from "react";

const SubmitToolForm = () => {
  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
        Suggest a New AI Tool 🚀
      </h2>
      <form
        action="https://formsubmit.co/aitoolzhub26@gmail.com"
        method="POST"
        className="space-y-4"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input
          type="text"
          name="Tool Name"
          placeholder="Tool Name"
          required
          className="w-full px-4 py-2 rounded-md border bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        />
        <textarea
          name="Description"
          placeholder="What does this tool do?"
          required
          className="w-full px-4 py-2 rounded-md border bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        />
        <input
          type="text"
          name="Category"
          placeholder="e.g. Writing, Design, SEO"
          required
          className="w-full px-4 py-2 rounded-md border bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        />
        <input
          type="url"
          name="Website"
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 rounded-md border bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        />
        <input
          type="text"
          name="Your Name"
          placeholder="(Optional) Your Name"
          className="w-full px-4 py-2 rounded-md border bg-zinc-100 dark:bg-zinc-800 dark:text-white"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-all"
        >
          Submit Tool
        </button>
      </form>
    </div>
  );
};

export default SubmitToolForm;
