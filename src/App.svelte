<div>
  <h1>Color Combinator</h1>
  <button on:click={combinateColors}>Combinate Colors</button>
  {#each paints as {rgbColor}}
    <div class="paint-chip" style={`background-color: ${rgbToHex(rgbColor)}`}>
    </div>
  {/each}
</div>

<style>
  h1 {
    color: purple;
  }

  .paint-chip {
    width: 25px;
    height: 25px;
    border: 1px solid #AAA;
    border-radius: 12.5px;
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  let paints = [];

  export let name: string;
  onMount(() => {
    console.log("App mounted");
  });

  function combinateColors() {
    parent.postMessage({ pluginMessage: { type: 'combinate-colors' } }, '*')
  }

  onmessage = (event) => {
    console.log("got this from the plugin code", event.data.pluginMessage);
    if (event.data.pluginMessage.type === "fills") {
        const paints = event.data.pluginMessage.payload;
        console.log(paints);
        // paints.map(paintToChip).forEach(c => chips.appendChild(c));
    }
    else {
        console.error("unrecognized event");
    }
  };

  function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  function rgbToHex({r, g, b}: {r: number, g: number, b: number}) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

</script>
