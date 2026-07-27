# Emoji Color System

This document describes the emoji-to-color mapping system in ljkui.

## Overview

The emoji color system automatically maps emojis to color scales in the ljkui design system. It analyzes the dominant color of each emoji and matches it to the closest `color-9` shade in the palette.

## Features

- 🎨 **Automatic color mapping** for 1,864+ emojis
- 🎯 **Perceptual color matching** using LAB color space (Delta E)
- ⚡ **Zero runtime overhead** - all mappings are pre-generated, just an O(1) object lookup
- 🔧 **Simple to use** - just a function call, no hooks needed
- 🔄 **Regeneratable** - update mappings when new emojis are added
- 🛡️ **Type-safe** - returns `ColorScale | undefined` for full control

## Usage

### Basic Usage

```tsx
import { getColorForEmoji } from 'ljkui';

function EmojiButton({ emoji, children }) {
  // Provide your own fallback with nullish coalescing
  const color = getColorForEmoji(emoji) ?? 'gray';

  return (
    <Button color={color}>
      {emoji} {children}
    </Button>
  );
}

// Examples:
<EmojiButton emoji="❤️">Love</EmojiButton>    // color: 'red'
<EmojiButton emoji="🌎">World</EmojiButton>   // color: 'cyan'
<EmojiButton emoji="🔥">Fire</EmojiButton>    // color: 'orange'
<EmojiButton emoji="🌟">Star</EmojiButton>    // color: 'yellow'
```

### With Custom Fallbacks

```tsx
import { getColorForEmoji } from 'ljkui';

// Use different fallbacks for different contexts
const brandColor = getColorForEmoji(emoji) ?? 'blue';
const safeColor = getColorForEmoji(emoji) || 'gray';

// Handle missing emojis explicitly
const color = getColorForEmoji(emoji);
if (!color) {
  console.warn('Unknown emoji:', emoji);
  return 'gray';
}
```

### Direct Access to the Map

For advanced use cases, you can access the full emoji color map:

```tsx
import { emojiColorMap, type ColorScale } from 'ljkui';

// Iterate through all mappings
Object.entries(emojiColorMap).forEach(([emoji, color]) => {
  console.log(`${emoji} -> ${color}`);
});

// Check if an emoji exists in the map
if (emojiColorMap['🚀']) {
  console.log('Rocket emoji is mapped!');
}
```

## Color Distribution

The current emoji set (1,864 emojis) has the following color distribution:

- **Gray** (26.8%) - Symbols, text, and grayscale emojis
- **Brown** (17.5%) - Skin tones, animals, food
- **Amber** (16.6%) - Golden items, food
- **Gold** (8.7%) - Metallic items
- **Bronze** (7.0%) - Earth tones
- **Red/Tomato/Ruby/Crimson** (8.8%) - Hearts, flags, food
- **Other colors** - Various items distributed across the palette

## Regenerating the Emoji Color Map

The emoji-to-color mappings are generated using a Node.js script located in `scripts/emoji-colors/` that:

1. Loads all emojis from the `emoji-datasource` package
2. Renders each emoji on a canvas using `@napi-rs/canvas`
3. Extracts the dominant color using a weighted color analysis
4. Matches the dominant color to the closest Radix color-9 value using Delta E (LAB color space)
5. Generates a TypeScript file with all mappings at `src/helpers/emoji-colors.ts`

### When to Regenerate

- When new emojis are added to Unicode
- When color palette values change (colors are added, removed, or renamed)
- When you want to adjust the color detection algorithm

### How to Regenerate

```bash
cd packages/ljkui
bun run generate:emoji-colors
```

This will regenerate `src/helpers/emoji-colors.ts` with updated mappings.

## Implementation Details

### File Structure

```
packages/ljkui/
├── scripts/
│   └── emoji-colors/
│       ├── generate.ts                # Main generation script
│       ├── README.md                  # This file
│       ├── IMPLEMENTATION.md          # Implementation details
│       └── utils/
│           ├── emoji-renderer.ts      # Canvas rendering logic
│           ├── color-extractor.ts     # Dominant color extraction
│           └── color-matcher.ts       # Match to color system
├── src/
│   ├── helpers/
│   │   └── emoji-colors.ts            # Generated mappings (auto-generated)
│   └── hooks/
│       ├── useColorForEmoji.ts        # React hook
│       ├── useColorForEmoji.example.tsx
│       └── index.ts
```

### Color Matching Algorithm

1. **Rendering**: Each emoji is rendered on a 128×128 canvas
2. **Extraction**: Non-transparent pixels are extracted
3. **Dominant Color**:
   - Uses weighted average favoring saturated colors
   - Bright colors are weighted higher than dark ones
   - Automatic grayscale detection for neutral emojis
   - Near-black detection (max RGB < 30)
   - Near-white detection (min RGB > 225)
4. **Matching**:
   - Converts RGB to LAB color space
   - Calculates Delta E (perceptual distance) to each palette color
   - Selects the closest match

### No Manual Overrides

All color assignments are **automatically calculated** - there are no manual overrides. This ensures that if color scales are added, removed, or renamed in the future, the system will automatically adapt to the new palette. Near-black and near-white emojis (like 🖤, 🤍, ⚫, ⚪) are automatically detected and mapped to 'gray'.

## API Reference

### `useColorForEmoji(emoji: string): ColorScale`

React hook that returns the color scale for an emoji.

**Parameters:**

- `emoji` - A single emoji character (or emoji sequence)

**Returns:**

- `ColorScale` - One of the ljkui color scale names

**Example:**

```tsx
const color = useColorForEmoji('🎨'); // Returns: 'brown'
```

### `getColorForEmoji(emoji: string): ColorScale`

Helper function that returns the color scale for an emoji (non-React).

**Parameters:**

- `emoji` - A single emoji character (or emoji sequence)

**Returns:**

- `ColorScale` - One of the ljkui color scale names (defaults to 'gray' if not found)

**Example:**

```typescript
const color = getColorForEmoji('🌈'); // Returns: 'iris'
```

### `emojiColorMap: Record<string, ColorScale>`

The complete mapping of all emojis to their color scales.

**Example:**

```typescript
console.log(emojiColorMap['❤️']); // 'red'
console.log(emojiColorMap['🌍']); // 'cyan'
```

### `ColorScale` Type

```typescript
type ColorScale =
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'lime'
  | 'mint'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'lemon'
  | 'magenta'
  | 'brown'
  | 'gold'
  | 'bronze'
  | 'sky'
  | 'gray';
```

## Examples

See `src/hooks/useColorForEmoji.example.tsx` for complete examples including:

- Emoji badges with color-coded backgrounds
- Emoji avatars with color borders
- Dynamic emoji cards
- Emoji lists with automatic coloring

## Performance

- **Build-time generation**: All color mappings are pre-computed
- **Zero runtime calculation**: Hook simply looks up the color from a static object
- **File size**: ~38KB for 1,864 emoji mappings
- **Tree-shakeable**: Only imports what you use

## Troubleshooting

### Emoji not found

If an emoji is not in the map, `getColorForEmoji()` will return `'gray'` as a fallback.

### Wrong color detected

If an emoji has an unexpected color assignment, this is usually because:

1. The emoji's dominant color is genuinely close to that color scale
2. The color detection algorithm needs refinement for edge cases

To improve the detection, you can adjust the color extraction or matching logic in:

- `scripts/emoji-colors/utils/color-extractor.ts` - Color weighting and extraction
- `scripts/emoji-colors/utils/color-matcher.ts` - Grayscale detection and color distance calculation

Then regenerate the mappings: `bun run generate:emoji-colors`

### Generation script fails

Make sure all dependencies are installed:

```bash
bun install
```

Required packages:

- `@napi-rs/canvas` - For rendering emojis
- `emoji-datasource` - For emoji data
- `color-convert` - For color space conversion
- `tsx` - For running TypeScript scripts
