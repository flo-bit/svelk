<script lang="ts">
  import Icon from "@iconify/svelte";
  import { numberToHumanReadable, toastSuccess } from "$lib/utils";
  import IconDrawer from "./IconDrawer.svelte";
  import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
    import { Button } from "bits-ui";
  import Avatar from "./Avatar.svelte";

  let { profile, hideFollowStats = false }: { profile: ProfileViewDetailed; hideFollowStats?: boolean } = $props();
</script>

<section class="flex flex-col gap-4 mt-4">
  <div class="flex gap-4 items-center">

    <Avatar src={profile.avatar} size="size-16" alt={`${profile.handle} profile picture`} />
    <div class="flex flex-col">
      <h1 class="text-lg font-semibold">{profile.displayName}</h1>
      <h2 class="font-medium flex items-center gap-2">
        @{profile.handle}
      </h2>

      {#if !hideFollowStats}
        <div class="flex gap-4">
          <p>{numberToHumanReadable(profile.followersCount)} Followers</p>
          <p>{numberToHumanReadable(profile.followsCount)} Following</p>
        </div>
      {/if}
    </div>
  </div>

  <!-- <div class="text-xs prose prose-invert prose-p:text-white prose-sm prose-pink prose-a:no-underline"> 
    {@html profile.description}
  </div> -->

  <!-- <section class="w-full flex gap-4 h-fit">
    <IconDrawer>
      {#snippet trigger()}
        <Button.Root class="flex items-center bg-pink-500 px-4 py-2 rounded w-full gap-4 text-sm hover:bg-pink-600/95 active:scale-95 active:transition-all duration-150">
          <Icon icon="solar:share-bold" />
          <p>Share</p>
        </Button.Root>
      {/snippet}

      {#snippet content()}
        <div class="flex flex-col gap-2">
          <a
            href={`https://${profile.handle}`} 
            target="_blank" 
            class="flex gap-4 items-center hover:bg-white/10 px-4 py-2 rounded transition-all duration-150"
          >
            <Icon icon="akar-icons:link-out" />
            Open {profile.handle}
          </a>
          <button 
            onclick={() => { 
              navigator.clipboard.writeText(profile.did);
              toastSuccess("Copied DID");
            }}
            class="flex gap-4 items-center hover:bg-white/10 px-4 py-2 rounded transition-all duration-150"
          >
            <Icon icon="tabler:copy" />
            Copy DID
          </button>
          <button 
            onclick={() => {
              navigator.clipboard.writeText(profile.handle);
              toastSuccess("Copied handle");
            }}
            class="flex gap-4 items-center hover:bg-white/10 px-4 py-2 rounded transition-all duration-150"
          >
            <Icon icon="tabler:copy" />
            Copy Domain
          </button>
        </div>
      {/snippet}
    </IconDrawer>

    <a href={`/p/${profile.handle}/stats`}>
      <Button.Root class="flex items-center bg-pink-500 px-4 py-2 rounded w-full gap-4 text-sm hover:bg-pink-600/95 active:scale-95 active:transition-all duration-150">
        <Icon icon="gridicons:stats-alt" />
        <p>Statistics</p>
      </Button.Root>
    </a>
  </section> -->
</section>
