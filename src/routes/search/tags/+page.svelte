<script lang="ts">
  import FeedTimeline from "$lib/components/FeedTimeline.svelte";
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs.js";
  import { onMount } from "svelte";

  let currentLoadingState: 'loading' | 'done' | 'error' = $state('loading');

  let posts: FeedViewPost[] = $state([]);

  let searchQuery = $state('flo-bit');
  let tag: string = $state('');

  async function fetchPosts() {
    const tags = tag.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    const filter_query = {
      q: searchQuery,
      tag: tags,
    };
    try {
      const response = await fetch(`/api/getTagsFeed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filter_query),
      });
      const results = await response.json()as { feed: FeedViewPost[], nextCursor: string }; 
      posts = results.feed;
      currentLoadingState = 'done';
    } catch (error) {
      console.error("Error fetching posts:", error);
      currentLoadingState = 'error';
    }
  }
  onMount(() => {
    fetchPosts();
  });

</script>



<div class="flex flex-col gap-4 mx-auto w-full max-w-2xl min-h-screen">
  <section class="flex flex-col gap-4 items-center w-full">
    <div class="flex items-center w-full space-x-2">
      <input 
        type="text" 
        placeholder="Enter search query...(required)" 
        bind:value={searchQuery} 
        class="border p-2 rounded text-black w-full h-12 "
      />
      <input 
      type="text" 
      id="tags" 
      placeholder="tag1,tag2, ..." bind:value={tag} 
      class="border p-2 rounded text-black w-full h-12"/>
      <button 
      onclick={() => fetchPosts()} 
      class="bg-pink-500 text-white px-4 py-2 h-12 rounded hover:bg-pink-500"
    >
      Refresh&nbsp;Posts
    </button>
    </div>

    {#if currentLoadingState === 'done'}
      <FeedTimeline feed={posts} />
    {:else if currentLoadingState === 'error'}
      <p>Error loading posts. Please try again later.</p>
    {:else}
      <p>Loading posts...</p>
    {/if}
  </section>
</div>
