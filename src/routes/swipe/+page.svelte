<script lang="ts">
  import { onMount } from "svelte";
  import { CardSwiper } from "./swiper/";
  import { fade } from "svelte/transition";

  let { data } = $props();

  onMount(async () => {
    for (let follow of data.follows) {
      await getSuggestedFollows(follow.did);
    }
  });

  const suggestions = $state([]);

  const suggestedMap = new Map();
  const alreadySuggested = new Set();

  let currentIndex = 0;

  function updateSuggestions() {
    const newSuggestions = Array.from(suggestedMap.values())
      .filter((suggestion) => !alreadySuggested.has(suggestion.did))
      .sort((a, b) => b.count - a.count);

    console.log(
      "adding",
      newSuggestions.length,
      "suggestions at index",
      currentIndex
    );
    for (let i = currentIndex; i < currentIndex + newSuggestions.length; i++) {
      suggestions[i] = newSuggestions[i - currentIndex];
    }
  }

  async function getSuggestedFollows(did: string) {
    const response = await fetch(`/api/getSuggestedFollows?did=${did}`);
    const json = await response.json();

    for (let suggestion of json.suggestions) {
      if (!suggestedMap.has(suggestion.did)) {
        suggestion.count = 1;
        suggestedMap.set(suggestion.did, suggestion);
      } else {
        const existing = suggestedMap.get(suggestion.did);
        existing.count += 1;
        suggestedMap.set(suggestion.did, existing);
      }
    }

    updateSuggestions();
  }

  // function that returns the data for each card, by default has title, description and image
  let cardData = (index: number) => {
    currentIndex = index;

    alreadySuggested.add(suggestions[index].did);

    return {
      title: suggestions[index].displayName ?? suggestions[index].handle,
      description:
        suggestions[index].description + " " + suggestions[index].count ?? "0",
      image: suggestions[index].avatar,
      handle: suggestions[index].handle,
    };
  };

  let thresholdPassed = $state(0);
</script>

{#if !data.user}
  <div class="max-w-xl mx-auto">
    <h1>Login to follow</h1>
  </div>
{:else}
  {#if suggestions.length > 0}
    <div class="h-[80vh] max-w-xl w-full mx-auto overflow-hidden px-2">
      <div class="h-full">
        <CardSwiper
          bind:thresholdPassed
          {cardData}
          onSwipe={async (data) => {
            console.log("swiped", data);
            if (data.direction === "right") {
              await fetch(`/api/follow?handle=${data.data.handle}`, {
                method: "POST",
              });
            }
          }}
        />
      </div>
    </div>
  {/if}
  {#if thresholdPassed !== 0}
    <div
      transition:fade={{ duration: 100 }}
      class="pointer-events-none absolute w-full h-full inset-0 flex items-center justify-center text-7xl text-accent-400 font-bold bg-black/50 backdrop-blur-sm"
    >
      {thresholdPassed > 0 ? "follow" : "skip"}
    </div>
  {/if}
{/if}
