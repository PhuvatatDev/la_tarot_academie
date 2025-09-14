# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the LA Tarot Académie project - an interactive tarot card drawing web application designed for live webinars and Psycho-Tarot training sessions. The application allows participants to draw their personal tarot card during presentations.

## Core Application Structure

The application is a single-page HTML application with embedded CSS and JavaScript:
- `index.html` - Main application file containing all HTML, CSS, and JavaScript
- `script.js` - Currently empty placeholder for JavaScript code
- `style.css` - Currently empty placeholder for CSS styles

The application does not use any build system or package manager - it's a static HTML/CSS/JS application designed for direct deployment to GitHub Pages.

## Key Features to Maintain

- **22 Major Arcana cards** from Rider-Waite Smith deck
- **Ultra-secure random drawing** using crypto.getRandomValues + mouse entropy
- **3D flip animation** for card reveal
- **Responsive design** optimized for mobile and desktop
- **Brand colors**: Gold (#A68245), Black (#0A0A0A), White
- **Animated particles** for ambiance

## Image Structure

When implementing the card images, they should be organized as:
```
/images/major/
├── 00-fool.jpg
├── 01-magician.jpg
├── 02-high-priestess.jpg
└── ... (up to 21-world.jpg)
```

Image specifications:
- Format: JPG or PNG
- Recommended size: 300x450px (2:3 ratio)
- File size: < 200KB per image

## Development Guidelines

### Running Locally
Open `index.html` directly in a browser or use a simple HTTP server:
```bash
python -m http.server 8000
```

### Key Configuration Points
- Image base path is configured in JavaScript as: `https://raw.githubusercontent.com/VOTRE-USERNAME/tarot-webinaire/main/images/major/`
- Brand colors are defined as CSS variables in `:root`
- Card data is stored in the `majorArcana` array in JavaScript

### Deployment
The application is designed for GitHub Pages deployment:
1. Repository should be public
2. Enable GitHub Pages from repository settings
3. Deploy from main branch, root folder
4. Access via: `https://USERNAME.github.io/REPO-NAME/`

## Important Technical Details

- The application uses vanilla JavaScript (no frameworks)
- CSS animations use transforms and keyframes for performance
- Random card selection uses crypto.getRandomValues for true randomness
- The application is fully client-side with no backend requirements