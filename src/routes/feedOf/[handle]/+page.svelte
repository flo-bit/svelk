<script lang="ts">
  import FeedTimeline from "$lib/components/FeedTimeline.svelte";
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs.js";

  import { getSelectedFeed } from "$lib/state.svelte";
  import { onMount } from "svelte";
  import { AtpBaseClient } from "@atproto/api";
  import type { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs.js";

  let { data } = $props();

  let currentLoadingState: 'profiles' | 'posts' | 'error' | 'done' = $state('profiles');
  let profilesLoaded = $state(0);
  let postsLoaded = $state(0);

  onMount(async () => {
    const agent = new AtpBaseClient({ service: "https://api.bsky.app" });

    const actor = data.profile?.did;

    if (!actor) {
      console.error("Could not resolve handle to DID");
      currentLoadingState = 'error';
      return;
    }

    let postPromises: Promise<FeedViewPost[]>[] = [];
    let allFollows: ProfileView[] = [];
    let cursor: string | undefined = undefined;
    // get all follows of actor
    if (agent instanceof AtpBaseClient) {
      do {
        const follows = await agent.app.bsky.graph.getFollows({ actor, limit: 100, cursor });

        allFollows.push(...follows.data.follows);
        cursor = follows.data.cursor;

        for (const follow of follows.data.follows) {
          postPromises.push(getPostsOfUser(follow.did, agent));
        }

        profilesLoaded = allFollows.length;

        // cursor = undefined;
        console.log(allFollows.length);
      } while (cursor);
    }

    currentLoadingState = 'posts';
    console.log("all follows", allFollows.length);

    const resolvedPosts = await Promise.all(postPromises);
    console.log("resolved posts", resolvedPosts.length);
    posts = resolvedPosts.flat().filter(post => post).sort((a, b) => {
      return new Date(b.post.record.createdAt).getTime() - new Date(a.post.record.createdAt).getTime();
    })
    console.log(posts);

    currentLoadingState = 'done';
  });

  // function addPosts(newPosts: FeedViewPost[]) {
  //   posts.push(...newPosts);
  //   posts = posts.sort((a, b) => {
  //     return new Date(b.post.record.createdAt).getTime() - new Date(a.post.record.createdAt).getTime();
  //   });

  //   console.log(posts.length);
  // }

  async function getPostsOfUser(actor: string, agent: AtpBaseClient) {
    try {
      const { data } = await agent.app.bsky.feed.getAuthorFeed({ actor, limit: 5 });


      console.log(data);
      postsLoaded += 1;

      return data.feed;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  let posts: FeedViewPost[] = $state([]);
</script>

<div class="flex flex-col gap-4 mx-auto w-full max-w-2xl min-h-screen">
  <section class="flex flex-col gap-4 items-center w-full">
    {#if currentLoadingState === 'profiles'}
      <p>Loading follows... {profilesLoaded} / {data.profile?.followsCount}</p>
    {:else if currentLoadingState === 'posts'}
      <p>Loading follows posts... {postsLoaded} / {data.profile?.followsCount}</p>
    {:else if currentLoadingState === 'error'}
      <p>Error loading posts</p>
    {:else}
      <FeedTimeline feed={posts.slice(0, 200)} />
    {/if}
  </section>
</div>
