<script lang="ts">
  import Icon from "@iconify/svelte";

  import { page } from "$app/stores";
  import { cn } from "$lib/utils";

  // get url
  let url = $derived($page.url.pathname);

  const menu = [
    {
      icon: "heroicons:home",
      label: "Home",
      href: "/",
    },
    {
      icon: "heroicons:bookmark",
      label: "Bookmarks",
      href: "/bookmarks",
    },
    {
      icon: "heroicons:book-open",
      label: "Console",
      href: "/console",
	}
  ];

</script>

{#key url}
  <ul role="list" class="flex flex-col items-center space-y-1">
    {#each menu as item}
      <li>
        <a
          href={item.href}
          class={cn(
            "group flex gap-x-3 rounded-md  p-3 text-sm/6 font-semibold",
            url === item.href
              ? "bg-base-900 text-white"
              : "text-base-400 hover:text-white hover:bg-base-800"
          )}
        >
          <Icon icon={item.icon} class="size-6 shrink-0" />
          <span class="sr-only">{item.label}</span>
        </a>
      </li>
    {/each}
  </ul>
{/key}
