<script lang="ts">
  import "../app.css";
  import { Button } from "bits-ui";
  import Icon from "@iconify/svelte";
  import { browser } from "$app/environment";
  import { Toaster } from "svelte-sonner";

  import { setContext, type Snippet } from "svelte";
  import { toastError } from "$lib/utils";
  import IconDrawer from "$lib/components/IconDrawer.svelte";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
  import User from "$lib/components/User.svelte";

  import LoginModal from "$lib/components/LoginModal.svelte";
  import { showLoginModel, getSelectedFeed } from "$lib/state.svelte";
  import Select from "$lib/components/Select.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import NewSkeet from "$lib/components/NewSkeet.svelte";

  let loginModel = showLoginModel();
  let selectedFeed = getSelectedFeed();

  let { data, children } = $props();
  const user = data.user as ProfileViewDetailed;

  // for individual pages/layouts to implement in context controls
  let bottomControls = $state<Snippet[]>([]);
  let setBottomControls = (snippet: Snippet) => bottomControls.push(snippet);
  let deleteBottomControl = (snippet: Snippet) =>
    (bottomControls = bottomControls.filter((s) => s != snippet));
  setContext("setBottomControls", setBottomControls);
  setContext("deleteBottomControl", deleteBottomControl);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });

  let contentInput = $state("");
</script>

<svelte:head>
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="myb.zeu.dev" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  />
  <meta
    name="viewport"
    content="viewport-fit=cover, user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
  />
</svelte:head>

{#if loginModel.value}
  <LoginModal />
{/if}

<div>
  <!-- Static sidebar for desktop -->
  <div
    class="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-base-950 lg:pb-4"
  >
    <div class="flex h-16 shrink-0 items-center justify-center">
      <a href="/">
        <span class="sr-only">Home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-8 text-accent-600 dark:text-accent-500"
        >
          <path
            fill-rule="evenodd"
            d="M4.5 9.75a6 6 0 0 1 11.573-2.226 3.75 3.75 0 0 1 4.133 4.303A4.5 4.5 0 0 1 18 20.25H6.75a5.25 5.25 0 0 1-2.23-10.004 6.072 6.072 0 0 1-.02-.496Z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
    <nav class="mt-8">
      <Sidebar />
    </nav>
  </div>

  <div class="lg:pl-20">
    <div
      class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-base-950 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
    >
      <button type="button" class="-m-2.5 p-2.5 text-base-700 lg:hidden">
        <span class="sr-only">Open sidebar</span>
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <Select
        items={["discovery", "following"]}
        active={selectedFeed.value}
        onchange={(active: string) => {
          selectedFeed.set(active as "discovery" | "following");
        }}
      />

      <!-- Separator -->
      <div class="h-6 w-px bg-base-900/10 lg:hidden" aria-hidden="true"></div>

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div class="flex-1"></div>

        <User {user} />
      </div>
    </div>

    <div class="h-[calc(100vh-4rem)] overflow-hidden"           id="scrollArea"
    >
      <QueryClientProvider client={queryClient}>
        <div
          class="relative w-full h-full min-w-full min-h-full bg-base-900 border border-r-0 border-base-800 rounded-l-xl text-white pt-4 pb-8 overflow-y-auto"
        >
          <main class="flex flex-col gap-4 pb-16">
            {@render children()}
          </main>

          {#snippet PostDrawerTrigger()}
            <Button.Root
              onclick={() => {
                if (!user) {
                  toastError("Must be logged in to post");
                }
              }}
              class="fixed bottom-4 right-4 z-50 rounded-full flex items-center bg-pink-500 p-4 w-fit gap-4 hover:bg-pink-600/95 active:scale-95 active:transition-all duration-150"
            >
              <Icon icon="hugeicons:quill-write-02" class="size-6" />
            </Button.Root>
          {/snippet}
          {#if !user}
            {@render PostDrawerTrigger()}
          {:else}
            <IconDrawer trigger={PostDrawerTrigger}>
              {#snippet content()}
                <div class="max-w-2xl mx-auto">
                  <NewSkeet />

                  <a href="/console" class="underline">Drafts</a>
                </div>
              {/snippet}
            </IconDrawer>
          {/if}
        </div>
      </QueryClientProvider>
    </div>
  </div>
</div>

<Toaster
  toastOptions={{
    unstyled: true,
    classes: {
      toast:
        "flex items-center gap-2 p-4 bg-base-800 border border-base-700 shadow shadow-black rounded-xl text-base-50",
    },
  }}
  position="bottom-left"
  theme="dark"
/>
