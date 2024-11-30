<script lang="ts">
  import { createInfiniteQuery } from "@tanstack/svelte-query";
  import FeedTimeline from "$lib/components/FeedTimeline.svelte";
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs.js";
  import { getSelectedFeed } from "$lib/state.svelte"; 

  let selectedFeed = getSelectedFeed();
  selectedFeed.set("tags");
  // selectedFeed.set("discovery");

  let { data } = $props();
  const discoveryQuery = createInfiniteQuery({
    queryKey: ["discoveryFeed"],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      queryParams.set(
        "feed", 
        "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot"
      );

      const response = await fetch(`/api/getCustomFeed?${queryParams.toString()}`);
      const results = await response.json() as { feed: FeedViewPost[], nextCursor: string };
      return results;
    },
    initialPageParam: "",
    getNextPageParam: (last) => last.nextCursor
  });

  const tagsQuery = createInfiniteQuery({
    queryKey: ["tagsFeed"],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      queryParams.set(
        "q", 
        "svelte"
      );
      const response = await fetch(`/api/getTagsFeed?${queryParams.toString()}`);
      const results = await response.json() as { feed: FeedViewPost[], nextCursor: string }; 
      return results; 
    },
    initialPageParam: "",
    getNextPageParam: (last) => last.nextCursor
  });

  let tagsFeed = $derived.by(() => {
    return $tagsQuery.data?.pages.flatMap(page => page.feed) ?? []
  });

  let discoveryFeed = $derived.by(() => {
    return $discoveryQuery.data?.pages.flatMap(page => page.feed) ?? []
  });

  //$inspect(selectedFeed);
</script>


<div class="flex flex-col gap-4 mx-auto w-full max-w-2xl min-h-screen">

  {#if selectedFeed.value === "tags"}
  <h1 class="text-2xl font-bold">This is the Tags Feed</h1>
    <section class="flex flex-col gap-4 items-center w-full">
      {#if $tagsQuery.isLoading}
        <p>Loading...</p>
      {:else if $tagsQuery.isError}
        <p>Error</p>
      {:else if $tagsQuery.isSuccess}
        <FeedTimeline feed={tagsFeed} loadMore={() => $tagsQuery.fetchNextPage()} />
        
        <p class="text-center mt-4 text-sm text-base-400">loading more...</p>
      {/if}
    </section>
  {/if}
  
    {#if selectedFeed.value === "discovery"}
    <h1 class="text-2xl font-bold">This is the Discovery Feed</h1>
    <section class="flex flex-col gap-4 items-center w-full">
      {#if $discoveryQuery.isLoading}
        <p>Loading...</p>
      {:else if $discoveryQuery.isError}
        <p>Error</p>
      {:else if $discoveryQuery.isSuccess}
        <FeedTimeline feed={discoveryFeed} loadMore={() => $discoveryQuery.fetchNextPage()} />
        
        <p class="text-center mt-4 text-sm text-base-400">loading more...</p>
      {/if}
    </section>
  {/if}
</div>
