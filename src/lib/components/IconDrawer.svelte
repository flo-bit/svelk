<script lang="ts">
  import { Drawer, type DrawerDirection } from "vaul-svelte";
  import type { Snippet } from "svelte";

  type Props = {
    trigger: Snippet;
    content: Snippet;
    title?: string;
    direction?: DrawerDirection;
  }

  let { trigger, content, title, direction = "bottom" }: Props = $props();
</script>

<Drawer.Root {direction}>
  <Drawer.Trigger> 
    {@render trigger()}
  </Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay class="fixed inset-0 bg-black/40" />
    <Drawer.Content 
      drawerDirection={direction}
      class={`
        fixed flex bg-base-900 px-2 text-white z-50 border border-base-800 border-b-0 max-w-3xl mx-auto
        ${direction === "bottom" && "bottom-0 left-0 right-0 h-fit pb-32 flex-col rounded-t-xl"}
        ${direction === "top" && "left-0 right-0 top-0 h-[50%] flex-col rounded-b-xl"}
        ${direction === "left" && "bottom-0 left-0 top-0 w-[50%] flex-row rounded-r-xl"}
        ${direction === "right" && "bottom-0 right-0 top-0 w-[50%] flex-row rounded-l-xl"}
      `}
    > 
      <div class="mx-auto h-1 mt-2 w-full max-w-32 rounded-full bg-base-600"></div>
      <Drawer.Title class="text-xl font-bold">{title}</Drawer.Title>
      <span class="my-auto pt-2">
        {@render content()}  
      </span>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>
