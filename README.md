# Color Combinator
Color Combinator (CC) is a [Figma plugin](https://www.figma.com/plugin-docs/intro/) for exploring different combinations of colors among elements.

# Usage Summary
Select elements that you want to see different combinations of and then hit the “Combinate Colors” button in the CC plugin window. Copies of your frame will appear to the right of the original and each will contain a different assignment of colors to elements.

<!-- @TODO embed trailer thumbnail https://stackoverflow.com/questions/11804820/embed-a-youtube-video -->
I strongly encourage you to check out the [demo](https://vimeo.com/361205568) to see it in action.

CC is a brand new plugin and has a few limitations:
- Supports only Text Nodes 
- Nodes must have only one fill that is a solid paint
- Nodes must be contained in a Frame

# How its Made
This section discusses how the color combinating is accomplished and web application development stack used to build the CC.

## The Stack
CC is built using [Svelte](https://svelte.dev). I started with the [typescript template](https://github.com/pyoner/svelte-typescript) made available by @pyoner. It works as advertised, but Figma plugins aren't part of the pitch. You'll have to adjust your `webpack.config.js` in order to include your style markup into `index.html` (plugin modal window interface). The Svelte build process spits out a CSS bundle for the entire app instead of linking individual CSS files per component like React. This particular setup is less than ideal because there are two concurrent build processes running (Rollup & Webpack). 

### Repo Map
- The color combinating logic is in `src/figma.ts`.
- The plugin UI code is in `src/App.svelte`. The UI is injected into `src/index.html` via `/src/main.ts` which bootstraps the Svelte app.

## The Color Combinating
Let's assume the user has selected 3 pieces of text in their Figma document. They click the "combinate colors" buttons.

1. The font colors are extracted from the text nodes
2. The text nodes are grouped by color
3. Every permutation of color-to-group assignments are generated
4. For every permutation
   1. Clone the current frame
   2. Change the color of the text nodes according to the permutation
