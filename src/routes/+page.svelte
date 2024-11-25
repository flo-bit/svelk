<script lang="ts">
  import { Select } from "bits-ui";
  import { getContext, onDestroy, type Snippet } from "svelte";
  import { createInfiniteQuery } from "@tanstack/svelte-query";
  import FeedTimeline from "$lib/components/FeedTimeline.svelte";
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs.js";

  import { getSelectedFeed } from "$lib/state.svelte"; 

  let selectedFeed = getSelectedFeed();

  let { data } = $props();
  let user = data.user;

  // TODO: implement feeds in user database
  let feeds = [
    { value: "following", label: "Following" },
    { value: "discovery", label: "Discovery" },
  ];
  
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

  const followingQuery = createInfiniteQuery({
    queryKey: ["followingFeed"],
    queryFn: async ({ pageParam }) => {
      const queryParams = new URLSearchParams();
      queryParams.set("cursor", pageParam || "");
      const response = await fetch(`/api/getFollowingFeed?${queryParams.toString()}`);
      const results = await response.json() as { feed: FeedViewPost[], nextCursor: string }; 
      return results; 
    },
    initialPageParam: "",
    getNextPageParam: (last) => last.nextCursor
  });

  let discoveryFeed = $derived.by(() => {
    return $discoveryQuery.data?.pages.flatMap(page => page.feed) ?? []
  });

  let followingFeed = $derived.by(() => {
    return $followingQuery.data?.pages.flatMap(page => page.feed) ?? []
  });

  $inspect(selectedFeed);
</script>


<div class="flex flex-col gap-4 mx-auto w-full max-w-2xl min-h-screen">

  {#if selectedFeed.value === "discovery"}
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

  {#if selectedFeed.value === "following"}
    <section class="flex flex-col gap-4 items-center w-full">
      {#if $followingQuery.isLoading}
        <p>Loading...</p>
      {:else if !user}
        <p>Need to be logged in to see Following tab</p>
      {:else if $followingQuery.isError}
        <p>Error</p>
      {:else if $followingQuery.isSuccess}
        <FeedTimeline feed={followingFeed} loadMore={() => $followingQuery.fetchNextPage()} />
        
          <p class="text-center mt-4 text-sm text-base-400">loading more...</p>

      {/if}
    </section>
  {/if}
</div>
