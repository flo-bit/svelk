<script lang="ts">
  import { enhance } from "$app/forms";
  import NewSkeet from "$lib/components/NewSkeet.svelte";
  import * as schema from "$lib/schema";

  let content = $state("");
  let currentDraftId = $state("");

  function editDraft(draft: typeof schema.DraftPost.$inferSelect) {
    content = draft.content ?? "";
    currentDraftId = draft.id;
  }

  let { data } = $props();
  let user = data.user;
</script>

<div class="flex flex-col gap-4 max-w-2xl mx-auto w-full px-4">
  <h1 class="text-3xl font-bold">Console</h1>

  {#if !user}
    <p>You must be logged in to view the console.</p>
  {:else}
    <NewSkeet />

    <h2 class="text-2xl font-bold">Drafts</h2>
    {#if data.drafts.length === 0}
      <p>No drafts saved.</p>
    {:else}
      {#each data.drafts as draft: DraftPost.$inferSelect}
        <article
          class="flex flex-col gap-4 border border-base-800 bg-base-950 p-4 rounded-xl"
        >
          <p>{draft.content}</p>
          <div class="flex gap-4 text-sm">
            <button
              onclick={() => editDraft(draft)}
              class="text-accent-400 hover:text-accent-500">use</button
            >
            <form use:enhance action="/?/deleteDraft" method="POST">
              <input name="id" type="hidden" value={draft.id} />
              <button
                type="submit"
                class="text-accent-400 hover:text-accent-500">delete</button
              >
            </form>
          </div>
        </article>
      {/each}
    {/if}
  {/if}
</div>
