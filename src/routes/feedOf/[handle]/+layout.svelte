<script lang="ts">
  import { Button } from "bits-ui";
  import { enhance } from "$app/forms";
  import { toastError } from "$lib/utils";
  import type { ActionData } from "./$types";
  import { getContext, onDestroy, type Snippet } from "svelte";
  import ProfileSummary from "$lib/components/ProfileSummary.svelte";
  import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

  type Props = {
    data: { user: ProfileViewDetailed; profile: ProfileViewDetailed };
    form: ActionData;
    children: Snippet;
  };

  let { data, children }: Props = $props();
</script>

{#if data.profile}
  <div class="flex flex-col gap-4 mx-auto w-full max-w-xl px-2">
    <div class="border-b border-base-800 pb-4">
      <div class="text-sm text-base-400">This is the feed of</div>

      <ProfileSummary profile={data.profile} />
    </div>

    {@render children()}
  </div>
{/if}
