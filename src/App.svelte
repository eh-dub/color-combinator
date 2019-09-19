<div>
  <button on:click={combinateColors}>Combinate Colors</button>
</div>

<style>
  
  div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  button {
    font-size: 2em;
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
