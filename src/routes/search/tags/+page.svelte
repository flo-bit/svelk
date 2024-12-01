<script lang="ts">
  import FeedTimeline from "$lib/components/FeedTimeline.svelte";
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs.js";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  let currentLoadingState = writable<'posts' | 'error' | 'done'>('posts');

  let posts = writable<FeedViewPost[]>([]);

  let searchQuery = writable('flo-bit');  

  async function fetchPosts(query: string) {
    const queryParams = new URLSearchParams();
    queryParams.set("q", query);

    try {
      const response = await fetch(`/api/getTagsFeed?${queryParams.toString()}`);
      const results = await response.json()as { feed: FeedViewPost[], nextCursor: string }; 
      console.log("Search results", results);
      posts.set(results.feed);
      currentLoadingState.set('done');
    } catch (error) {
      console.error("Error fetching posts:", error);
      currentLoadingState.set('error');
    }
  }

  onMount(() => {
    $searchQuery && fetchPosts($searchQuery);
  });
</script>
<div class="flex flex-col gap-4 mx-auto w-full max-w-2xl min-h-screen">
  <section class="flex flex-col gap-4 items-center w-full">
    <div class="flex items-center w-full space-x-2">
      <input 
        type="text" 
        placeholder="Enter search query..." 
        bind:value={$searchQuery} 
        class="border p-2 rounded text-black w-full h-12 "
      />
  <button 
    onclick={() => fetchPosts($searchQuery)} 
    class="bg-pink-500 text-white px-4 py-2 h-12 rounded hover:bg-pink-500"
  >
    Refresh&nbsp;Posts
  </button>
    </div>
    {#if $currentLoadingState === 'done'}
      <FeedTimeline feed={$posts.slice(0, 200)} />
    {:else if $currentLoadingState === 'error'}
      <p>Error loading posts. Please try again later.</p>
    {:else}
      <p>Loading posts...</p>
    {/if}
  </section>
</div>
