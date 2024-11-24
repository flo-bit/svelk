<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { showLoginModel } from "$lib/state.svelte";

  let loginModal = showLoginModel();
</script>

<div
  class="fixed inset-0 z-[100] w-screen overflow-y-auto"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
	transition:fade={{ duration: 100 }}
    class="fixed inset-0 bg-base-950/75 backdrop-blur-sm transition-opacity"
    onclick={() => loginModal.toggle()}
    aria-hidden="true"
  ></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto pointer-events-none">
    <div
      class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div
        class="pointer-events-auto relative transform overflow-hidden rounded-lg bg-base-800 border border-base-700 px-4 pb-4 pt-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
      >
        <div>
          <div class="text-center">
            <h3
              class="text-base font-semibold text-base-900 dark:text-base-100"
              id="modal-title"
            >
              Login
            </h3>
          </div>
        </div>
        <form
          action="/?/login"
          method="POST"
          class="flex flex-col gap-2 w-full mt-2"
        >
          <div class="w-full">
            <label
              for="handle"
              class="block text-sm/6 font-medium text-base-900 dark:text-base-100"
              >Handle</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="handle"
                id="handle"
                class="block w-full rounded-md border-0 py-1.5 dark:bg-base-900 text-base-900 dark:text-base-100 shadow-sm ring-1 ring-inset ring-base-300 dark:ring-base-700 placeholder:text-base-400 dark:placeholder:text-base-600 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm/6"
                placeholder="yourname.blsky.social"
              />
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button
              type="submit"
              class="inline-flex w-full justify-center rounded-md bg-accent-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
              >Login</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
