<script lang="ts">
  const { data } = $props();  
  $inspect(data);
  console.log(data.uri);
  console.log(new URL(data.uri));
  const domain = new URL(data.uri).hostname.replace("www.", "");
</script>

<article
  class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-base-950 p-4 aspect-[16/9] border border-base-400/20"
>
  {#if data.thumb}
    <img
      src={data.thumb}
      alt={data.description}
      class="absolute inset-0 size-full -z-10 object-cover group-hover:scale-105 transition-transform duration-300"
    />
  {/if}
  <div
    class="absolute inset-0 rounded-xl -z-10 bg-gradient-to-t from-base-950/90 via-base-950/40"
  ></div>
  

  <div
    class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-base-300"
  >
    <div>{domain}</div>
  </div>
  <h3 class="mt-1 text-lg/6 font-semibold text-white">
    <a href={data.uri} target="_blank" rel="noopener noreferrer nofollow">
      <span class="absolute inset-0"></span>
      {data.title}
    </a>
  </h3>
</article>
