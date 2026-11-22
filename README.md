# Holden Prine — Portfolio 2026

A single-page developer portfolio built with React and TypeScript. Scrolling drives a full-screen GSAP tile transition between panels, and the tile colors change with the seasons.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white)

## Table of Contents

- [Tools Used](#tools-used)
- [Features](#features)
  - [GSAP Tile Transitions](#gsap-tile-transitions)
  - [Seasonal Tile Palettes](#seasonal-tile-palettes)
  - [shadcn/ui Components](#shadcnui-components)

## Tools Used

| | Tool | Purpose |
|---|---|---|
| <img src="https://cdn.simpleicons.org/typescript" width="20" /> | [TypeScript](https://www.typescriptlang.org/) | Type-safe application code |
| <img src="https://cdn.simpleicons.org/react" width="20" /> | [React](https://react.dev/) | UI framework |
| <img src="https://cdn.simpleicons.org/vite" width="20" /> | [Vite](https://vite.dev/) | Dev server and build tooling |
| <img src="https://cdn.simpleicons.org/tailwindcss" width="20" /> | [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| <img src="https://cdn.simpleicons.org/greensock" width="20" /> | [GSAP](https://gsap.com/) | ScrollTrigger, ScrollSmoother, and ScrambleText animations |
| <img src="https://cdn.simpleicons.org/shadcnui" width="20" /> | [shadcn/ui](https://ui.shadcn.com/) | Accessible, customizable UI components |
| <img src="https://cdn.simpleicons.org/radixui" width="20" /> | [Radix UI](https://www.radix-ui.com/) | Headless primitives behind the shadcn components |
| <img src="https://cdn.simpleicons.org/lucide" width="20" /> | [Lucide](https://lucide.dev/) / [React Icons](https://react-icons.github.io/react-icons/) | Iconography |
| | [Embla Carousel](https://www.embla-carousel.com/) | Projects carousel engine |
| <img src="https://cdn.simpleicons.org/eslint" width="20" /> | [ESLint](https://eslint.org/) | Linting |

## Features

### GSAP Tile Transitions

All panels (Title, Bio, Projects, Contact) are stacked in a single viewport-sized frame that is pinned with **ScrollTrigger**. As the user scrolls, a scrubbed timeline plays a tile wipe for each panel:

1. Each tile in a 12 × 8 grid is assigned a random color from the active palette.
2. The tiles scale in left to right with a grid stagger, covering the screen.
3. The next panel is swapped in underneath.
4. The tiles scale back out left to right, revealing the new panel.

Timeline callbacks hook into the wipe to trigger panel-specific animations, such as restarting the Bio's **ScrambleText** effect and starting the Contact chat sequence. **ScrollSmoother** provides smooth scrolling throughout.

### Seasonal Tile Palettes

The tile colors change with the time of year. On load, the current month sets a `data-season` attribute on `<html>`, and each season defines its own five-color palette through the `--tile-1` to `--tile-5` CSS variables in `src/App.css`.

| Season | Months | Palette |
|---|---|---|
| Winter | Dec – Feb | ![](https://img.shields.io/badge/-df2935-df2935?style=flat-square) ![](https://img.shields.io/badge/-1f4d36-1f4d36?style=flat-square) ![](https://img.shields.io/badge/-fffafa-fffafa?style=flat-square) ![](https://img.shields.io/badge/-dfa06e-dfa06e?style=flat-square) ![](https://img.shields.io/badge/-412722-412722?style=flat-square) |
| Spring | Mar – May | ![](https://img.shields.io/badge/-61a0af-61a0af?style=flat-square) ![](https://img.shields.io/badge/-96c9dc-96c9dc?style=flat-square) ![](https://img.shields.io/badge/-f06c9b-f06c9b?style=flat-square) ![](https://img.shields.io/badge/-f9b9b7-f9b9b7?style=flat-square) ![](https://img.shields.io/badge/-f5d491-f5d491?style=flat-square) |
| Summer | Jun – Aug | ![](https://img.shields.io/badge/-586ba4-586ba4?style=flat-square) ![](https://img.shields.io/badge/-324376-324376?style=flat-square) ![](https://img.shields.io/badge/-f5dd90-f5dd90?style=flat-square) ![](https://img.shields.io/badge/-f68e5f-f68e5f?style=flat-square) ![](https://img.shields.io/badge/-f76c5e-f76c5e?style=flat-square) |
| Fall | Sep – Nov | ![](https://img.shields.io/badge/-44355b-44355b?style=flat-square) ![](https://img.shields.io/badge/-31263e-31263e?style=flat-square) ![](https://img.shields.io/badge/-221e22-221e22?style=flat-square) ![](https://img.shields.io/badge/-eca72c-eca72c?style=flat-square) ![](https://img.shields.io/badge/-ee5622-ee5622?style=flat-square) |

If you want to see each palette in action, clone a copy and preview a specific season by adding a `date` query parameter in `YYYY-MM-DD` format:

```
http://localhost:5173/?date=2026-07-15
```

### shadcn/ui Components

UI components live in `src/components/ui` and are built on Radix UI primitives with Tailwind styling.

| Component | Used In | Purpose |
|---|---|---|
| `Carousel` | Projects | Swipeable project cards, with arrow-key navigation |
| `Card` | Projects | Project title, description, and icon |
| `Slider` | Projects | Scrubs through the carousel |
| `Button` | Projects | "See More" project links |
| `Message` / `Bubble` | Contact | Chat-style contact prompt and reply options |
| `Avatar` | Contact | Chat participant avatars |
| `Marker` | Contact | "typing..." indicator |