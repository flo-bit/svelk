<script lang="ts">
  import External from "./External.svelte";
  import Images from "./Images.svelte";
  import Video from "./Video.svelte";
  const { data } = $props();
</script>

{#if data.post.embed}
  <div class="flex gap-2 flex-col pt-2 text-sm">
    {#if data.post.embed.$type === "app.bsky.embed.images#view"}
	  <Images data={data.post.embed.images} />
    {:else if data.post.embed.$type === "app.bsky.embed.external#view" && data.post.embed.external?.uri}
      <External data={data.post.embed.external} />
    {:else if data.post.embed.$type === "app.bsky.embed.video#view"}
      <Video data={data.post.embed} />
    {/if}
  </div>
{/if}
