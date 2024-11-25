<script lang="ts">
  const { data } = $props();
</script>

{#each data as { fullsize: string; alt: string, thumb: string }[] as image}
<img
  loading="lazy"
  src={image.thumb}
  alt={image.alt}
  class="w-full rounded-2xl border dark:border-base-400/20"
/>
{/each}
