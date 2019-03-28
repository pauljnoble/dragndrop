# Drag 'n' drop image collage prototype

A coding challenge.

Drag 'n' drop prototype demonstrating auto grid layout.

To develop locally run `yarn` and `yarn start`.

## What's been changed

-   WYSIWYG style collage drag and drop with dynamic grid that responds to drag events
-   Removed grid line overlay / noise to rely on interaction intuition
-   Removed image selection
-   Added image removal feature
-   As animating dimensional changes is performance intensive, an animation library has been added for the grid transitions

## What's not included

-   Grid variations for grids with the same number of cells (though this would be easily extensible via CSS grid template regions)
-   Other application functionality (e.g. crop, resize, rotate etc.)

## Other features

-   Interactions and theming variables split into a configurable file (`src/styles/theme.js`)
-   Grid rendition based on CSS grid layout for performance / extensibility
-   Single source of truth via application state (`src/App.js`) with minimal internal state in components

noble.pauljames@gmail.com
