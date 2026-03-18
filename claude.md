# Obre - RPG Story Showcase

## Project Overview

Obre is a **visual showcase website** that chronicles the story of a tabletop role-playing game (RPG) campaign. As sessions progress, key moments and pivotal events are illustrated, creating a visual narrative of the adventure.

## Concept

- **One-page layout** with a giant carousel-style navigation
- **Organized by sessions/chapters** of the RPG campaign
- Each section features:
  - An **illustration** of a key moment
  - **Context text** explaining the scene and its significance to the story
- Users can browse through the story **image by image**, retracing the narrative journey

## Tech Stack

- **Next.js 16** with React 19
- **TypeScript** with strict mode
- **CSS Modules** for component styling
- **hover-tilt** web component for interactive card effects
- Static export for GitHub Pages deployment

## Visual Effects

The project features a sophisticated **rainbow effect** system for cards:
- Layered CSS approach with masks and blend modes
- Dynamic interaction based on pointer position
- Scanlines overlay for aesthetic depth
- Applied via mask images to specific regions

## Project Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # React components (TiltableCard, etc.)
├── lib/           # Utilities (HoverTilt wrapper, basePath)
└── types/         # TypeScript declarations

public/
├── illustrations/ # Story illustrations organized by ID
└── textures/      # Effect textures (glitter, cosmos, etc.)
```

## Illustrations Format

Each illustration is stored in `public/illustrations/{id}/`:
- `image.png` - Main illustration
- `mask.png` - Effect mask for rainbow overlay regions

## Design Goals

1. **Immersive storytelling** through visuals
2. **Interactive elements** (tilt effects, rainbow shine) to engage users
3. **Clean navigation** between story chapters
4. **Responsive design** for all devices
