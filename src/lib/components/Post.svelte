<script lang="ts">
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
  import Avatar from "./Avatar.svelte";
  import RelativeTime from "./relative-time";
  import { page } from "$app/stores";
  import { applyAction, enhance } from "$app/forms";
  import Embed from "./embeds/Embed.svelte";
  import { cn, numberToHumanReadable, renderPostAsHtml } from "$lib/utils";
  import { onMount } from "svelte";

  import Post from "./Post.svelte";

  let {
    data,
    class: className,
    intersect,
  }: { data: FeedViewPost; class?: string; intersect?: () => void } = $props();
  const bookmarks = $page.data.bookmarks as Set<string>;
  let isBookmarked = $state(bookmarks.has(data.post.uri) ?? false);

  onMount(() => {
    const options = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(() => {
      intersect?.();
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  });

  let element: HTMLElement;
  // console.log(data);
</script>

<!-- {#if data.reply}
<Post data={{post: data.reply.parent}} />
{/if} -->

<div
  bind:this={element}
  class={cn(
    "px-4 py-3 text-base-950 transition-colors duration-200 dark:text-base-50",
    className
  )}
>
  {#if data.reason && data.reason.$type === "app.bsky.feed.defs#reasonRepost"}
    <div class="text-xs font-medium pl-4 mb-3 inline-flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3">
        <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" />
      </svg>
      
      <div class="inline-flex gap-1">
      reposted by 
      <a href={"/p/" + data.reason.by.handle} class="font-bold hover:text-accent-400">
        @{data.reason.by.handle}
      </a>
    </div>
    </div>
  {/if}
  <div class="flex gap-4">
    <Avatar
      link={"/p/" + data.post.author?.handle}
      src={data.post.author?.avatar}
    />

    <div class="w-full">
      <div class="mb-1 flex items-start justify-between gap-2">
        <a
          class="group -mx-2 -my-0.5 flex flex-col items-baseline gap-x-2 rounded-xl px-2 py-0.5 hover:bg-accent-900/5 sm:flex-row"
          href={"/p/" + data.post.author.handle}
        >
          <div
            class="text-sm font-semibold leading-tight text-base-950 group-hover:text-accent-600 dark:text-base-50 dark:group-hover:text-accent-300"
          >
            {data.post.author?.displayName}
          </div>
          <div
            class="text-sm text-base-600 group-hover:text-accent-600 dark:text-base-400 dark:group-hover:text-accent-400"
          >
            @{data.post.author?.handle}
          </div>
        </a>
        <!-- <a href={postUrl} class="no-underline" target="_blank" rel="noopener noreferrer nofollow">
				<Bluesky
					class="ease h-8 text-accent-600 transition-all duration-200 hover:scale-110 hover:text-accent-500"
				/>
			</a> -->
      {#if data.post.record?.createdAt}
        <a
          href={"#"}
          class="block text-sm text-base-600 no-underline hover:text-accent-700 dark:text-base-400 dark:hover:text-accent-300"
        >
          <RelativeTime
            date={new Date(data.post.record?.createdAt)}
            locale="en"
          />
        </a>
      {/if}
      </div>

      <p
        class="text-sm prose prose-invert prose-p:text-white prose-sm prose-pink prose-a:no-underline"
      >
        {@html renderPostAsHtml(data.post)}
      </p>

      <!-- {embed && <Embed embed={embed} postUrl={postUrl} />} -->
      <!-- <a
			href={link}
			class="mt-2 block text-sm text-base-600 no-underline hover:text-accent-700 dark:text-base-400 dark:hover:text-accent-300"
		>
			{formatter.format(new Date(createdAt))}
		</a> -->

      <Embed {data} />

      <div
        class="mt-4 flex justify-between gap-2 text-base-500 dark:text-base-400"
      >
        <button class="group inline-flex items-center gap-2 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="-m-1.5 size-7 rounded-full p-1.5 transition-all duration-100 group-hover:bg-amber-500/10 group-hover:text-amber-700 dark:group-hover:text-amber-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
          {#if data.post.replyCount}
            {numberToHumanReadable(data.post.replyCount)}
          {/if}
        </button>

        <button class="group inline-flex items-center gap-2 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="-m-1.5 size-7 rounded-full p-1.5 transition-all duration-100 group-hover:bg-sky-500/10 group-hover:text-sky-700 dark:group-hover:text-sky-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          {#if data.post.repostCount}
            {numberToHumanReadable(data.post.repostCount)}
          {/if}
        </button>

        <button class="group inline-flex items-center gap-2 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="-m-1.5 size-7 rounded-full p-1.5 transition-all duration-100 group-hover:bg-indigo-500/10 group-hover:text-indigo-700 dark:group-hover:text-indigo-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          {#if data.post.likeCount}
            {numberToHumanReadable(data.post.likeCount)}
          {/if}
        </button>

        <form
          method="POST"
          action="/?/bookmarkPost"
          use:enhance={() => {
            return async ({ result }) => {
              // @ts-ignore
              if (result.data.uri === data.post.uri) {
                // @ts-ignore
                isBookmarked = result.data.message === "bookmarked";
              }
              await applyAction(result);
            };
          }}
          class="group inline-flex items-center gap-2 text-sm"
        >
          <input name="post_uri" type="hidden" value={data.post.uri} />
          <input name="is_bookmarked" type="hidden" value={isBookmarked} />
          <button type="submit" class="inline-flex">
            <span class="sr-only">Bookmark</span>

            {#if isBookmarked}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="-m-1.5 size-7 rounded-full p-1.5 transition-all duration-100 group-hover:bg-pink-500/10 group-hover:text-pink-700 dark:group-hover:text-pink-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                  clip-rule="evenodd"
                />
              </svg>
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="-m-1.5 size-7 rounded-full p-1.5 transition-all duration-100 group-hover:bg-pink-500/10 group-hover:text-pink-700 dark:group-hover:text-pink-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
