<form
  action="https://formspree.io/f/mqabdbry"
  method="POST"
  className="space-y-4"
>
  <input type="hidden" name="_captcha" value="false" />
  <input type="hidden" name="_redirect" value="https://aitoolzhub.xyz/thanks" />
  <input type="text" name="_honey" className="hidden" tabIndex="-1" autoComplete="off" />

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
