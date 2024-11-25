<script lang="ts">
  import { goto } from "$app/navigation";

	let handle = $state('');
</script>

<div class="mx-auto w-full max-w-xl flex flex-col gap-4">
  <div class="text-xl font-semibold my-4">Enter a handle to show someone's feed</div>

  <div class="w-full">
    <label
      for="handle"
      class="block text-sm/6 font-medium text-base-900 dark:text-base-100"
      >Handle</label
    >
    <div class="mt-2">
      <input
        bind:value={handle}
        type="text"
        name="lala"
        id="lala"
        class="block w-full rounded-md border-0 py-1.5 dark:bg-base-900 text-base-900 dark:text-base-100 shadow-sm ring-1 ring-inset ring-base-300 dark:ring-base-700 placeholder:text-base-400 dark:placeholder:text-base-600 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm/6"
        placeholder="yourname.blsky.social"
      />
    </div>
  </div>
  <div class="flex justify-end">
    <button
      onclick={() => {
        goto(`/feedOf/${handle}`);
      }}
      class="inline-flex justify-center rounded-md bg-accent-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
      >Show feed</button
    >
  </div>
</div>
