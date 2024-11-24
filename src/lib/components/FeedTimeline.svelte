<script lang="ts">
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
  import Post from "./Post.svelte";

  type Props = {
    feed: FeedViewPost[];
  };

  type FeedPost = FeedViewPost & { html: string };

  let { feed }: Props = $props();

  let showReposts = $state(true);
  let showReplies = $state(true);
</script>

<ol class="flex flex-col divide-y divide-base-800 w-full">
  {#each feed as post: FeedPost}
    {#if !(post.reason && !showReposts) && !(post.reply && !showReplies)}
      <li>
        <Post data={post} />
      </li>
    {/if}
  {/each}
</ol>
