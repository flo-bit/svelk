<script lang="ts">
	export let element: HTMLElement;

	export let title: string = '';
	export let description: string = '';
	export let image: string | undefined = undefined;
</script>

<div
	class="w-full h-full absolute cursor-grab ease-in-out rounded-xl touch-none select-none border border-base-700 bg-base-900"
	bind:this={element}
>
	{#key image}
		{#if image}
			<img class="w-full h-full rounded-xl object-cover" src={image} alt={title} />
		{/if}
	{/key}
	<div class="absolute inset-0 bg-gradient-to-t from-base-900/80 via-base-900/0 rounded-b-xl"></div>
	<div class="p-4 absolute bottom-0 w-full flex justify-center">
		<div class="flex items-center flex-col">
			<h3 class="text-3xl font-semibold pb-4">{title}</h3>
			<p>{description}</p>
		</div>
	</div>
</div>
