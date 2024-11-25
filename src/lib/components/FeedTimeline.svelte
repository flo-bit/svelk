<script lang="ts">
  import { callSecondTime } from "$lib/utils";
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
  import Post from "./Post.svelte";

  type Props = {
    feed: FeedViewPost[];
    loadMore?: () => void;
  };

  let { feed, loadMore }: Props = $props();
</script>

<ol class="flex flex-col divide-y divide-base-800 w-full">
  {#each feed as post: FeedViewPost, index}
  {#if post.post.author && post.post.record}
    {#if index === feed.length - 4 && loadMore}
      <li>
        <Post data={post} intersect={callSecondTime(() => {
          loadMore();
        })} />
      </li>
    {:else}
      <li>
        <Post data={post} />
      </li>
    {/if}
    {/if}
  {/each}
</ol>
