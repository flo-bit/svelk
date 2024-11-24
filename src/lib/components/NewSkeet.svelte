<script>
  import { enhance } from "$app/forms";

  let contentInput = $state("");
</script>

<form
  use:enhance
  action="/?/createPost"
  method="POST"
  class="flex flex-col gap-4 max-w-2xl mx-auto w-full"
>
  <label
    for="handle"
    class="block text-sm/6 font-medium text-base-900 dark:text-base-100"
    >Skeet something</label
  >
  <textarea
    name="content"
    bind:value={contentInput}
    placeholder="your deepest thoughts here..."
    class="block w-full rounded-md border-0 py-1.5 dark:bg-base-950 text-base-900 dark:text-base-100 shadow-sm ring-1 ring-inset ring-base-300 dark:ring-base-700 placeholder:text-base-400 dark:placeholder:text-base-600 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm/6"
    style="field-sizing: content; min-height: 100px;"
    maxlength={300}
  >
  </textarea>
  <div class="flex items-end justify-end gap-2">
    <button
      formaction="/?/saveDraft"
	  class="inline-flex justify-center rounded-md bg-base-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-base-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={contentInput.length === 0}
    >
      Save Draft
    </button>
    <button
      type="submit"
	  class="inline-flex justify-center rounded-md bg-accent-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={contentInput.length === 0}
    >
      Skeet
    </button>

  </div>
</form>
