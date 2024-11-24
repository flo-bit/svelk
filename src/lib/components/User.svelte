<script lang="ts">
  import { slide } from "svelte/transition";
  import Avatar from "./Avatar.svelte";
  import { showLoginModel } from "$lib/state.svelte";

  let loginModel = showLoginModel();

  type Props = {
    user: {
      avatar?: string;
      handle?: string;
    };
  };

  const { user }: Props = $props();

  let showDropdown = $state(false);
</script>

<div class="flex items-center gap-x-4 lg:gap-x-6">
  <!-- <button
    type="button"
    class="-m-2.5 p-2.5 text-base-400 hover:text-base-500 dark:text-base-600"
  >
    <span class="sr-only">View notifications</span>
    <svg
      class="size-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
      data-slot="icon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
      />
    </svg>
  </button> -->

  <!-- Separator -->
  <div
    class="hidden lg:block lg:h-6 lg:w-px lg:bg-base-900/10 dark:lg:bg-base-100/10"
    aria-hidden="true"
  ></div>

  <!-- Profile dropdown -->
  <div class="relative">
    <button
      type="button"
      class="-m-1.5 flex items-center p-1.5"
      id="user-menu-button"
      aria-expanded="false"
      aria-haspopup="true"
      onclick={() => (showDropdown = !showDropdown)}
    >
      <span class="sr-only">Open user menu</span>
      <Avatar src={user?.avatar} size="size-8" />

      <span class="hidden lg:flex lg:items-center">
        {#if user}
          <span
            class="ml-4 text-sm/6 font-semibold text-base-900 dark:text-base-100"
            aria-hidden="true"
          >
            {user.handle}
          </span>
        {:else}
          <span
            class="ml-4 text-sm/6 font-semibold text-base-900 dark:text-base-100"
            aria-hidden="true"
          >
            Guest
          </span>
        {/if}
        <svg
          class="ml-2 size-5 text-base-400 dark:text-base-600"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            fill-rule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>

    {#if showDropdown}
      <div
        out:slide
        class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-base-800 py-2 shadow-lg ring-1 ring-base-100/20 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        <!-- Active: "bg-base-50 outline-none", Not Active: "" -->
        {#if user}
		<form action="/?/logout" method="POST" class="flex gap-4">

          <button
            type="submit"
            class="block px-3 py-1 text-sm/6 text-base-900 dark:text-base-100"
            role="menuitem"
            tabindex="-1"
            id="user-menu-item-1">Log out</button
          >
		</form>
        {:else}
          <button
            onclick={() => {
				loginModel.toggle()
				showDropdown = false;
			}
				}
            class="block px-3 py-1 text-sm/6 text-base-900 dark:text-base-100"
            role="menuitem"
            tabindex="-1"
            id="user-menu-item-1">Login</button
          >
        {/if}
      </div>
    {/if}
  </div>
</div>
