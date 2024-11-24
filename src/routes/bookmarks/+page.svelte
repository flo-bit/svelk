<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import PostItem from "$lib/components/PostItem.svelte";
  import Post from "$lib/components/Post.svelte";

  const bookmarksQuery = createQuery({
    queryKey: ["bookmarksQuery"],
    queryFn: async () => {
      const response = await fetch("/api/getBookmarks");
      const { posts } = await response.json();
      return posts;
    },
  });


  let { data } = $props();
  let user = data.user;
</script>

<div class="flex flex-col gap-4 mx-auto w-full max-w-2xl px-4">
  <h1 class="text-3xl font-bold">Bookmarks</h1>

  {#if !user}
    <p>You must be logged in to view your bookmarks.</p>
  {:else}
  {#if $bookmarksQuery.isLoading}
    <p>Loading...</p>
  {:else if $bookmarksQuery.data}
    {#if $bookmarksQuery.data.length === 0}
      <p>You don't have any bookmarks</p>
    {:else}
      {#each $bookmarksQuery.data as post}
        <Post data={post} />
      {/each}
    {/if}
  {/if}
  {/if}
</div>
