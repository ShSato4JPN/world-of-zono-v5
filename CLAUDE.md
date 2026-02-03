# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **world-of-zono-v5**, a Next.js 16 application using the App Router architecture with React 19 and TypeScript.

## Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Build & Production
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run Biome linter
npm run format       # Auto-format code with Biome
```

## Architecture

### Tech Stack
- **Framework:** Next.js 16 with App Router (`src/app/`)
- **React:** v19 with React Compiler enabled for automatic optimizations
- **Styling:** Tailwind CSS v4 with dark mode support via CSS custom properties
- **Linting/Formatting:** Biome (not ESLint/Prettier)
- **CMS:** microCMS integration configured via MCP

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
- `public/` - Static assets

### Key Configuration
- **TypeScript:** Strict mode enabled, path alias `@/*` maps to `./src/*`
- **React Compiler:** Enabled in `next.config.ts` for automatic component optimization
- **Biome:** Configured with Next.js and React recommended rules, 2-space indentation

## Code Style

This project uses Biome instead of ESLint/Prettier. Run `npm run format` before committing. Biome handles both linting and formatting in one tool.
