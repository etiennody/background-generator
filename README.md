# Background Generator

Small web app that lets you pick two colors and generates a linear-gradient background while displaying the CSS for it.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Open `index.html` in your browser for a quick preview, or run the dev server:

   ```bash
   npm run build
   ```

   This creates `bundle.js` and launches a local server so you can see changes live.

## Development

Build the browser bundle and run the dev server:

```bash
npm run build
```

If you'd rather serve the static file without rebuilding, you can open `index.html`
directly in your browser.

## Tests

Run the test suite:

```bash
npm test
```

Tests use Node's built-in `node --test` runner and validate the gradient update logic
along with the HTML label markup.
