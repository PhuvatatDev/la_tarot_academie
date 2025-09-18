# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the LA Tarot Académie project - an interactive tarot card drawing web application designed for live webinars and Psycho-Tarot training sessions. The application allows participants to draw their personal tarot card during presentations.

**Live Application**: https://PhuvatatDev.github.io/la_tarot_academie/

## Core Application Structure

The application is a single-page HTML application with separate CSS and JavaScript files:
- `index.html` - Main application file (229 lines)
- `script.js` - Complete JavaScript implementation with card data and logic (645 lines)
- `style.css` - Complete CSS styling with animations and responsive design (1,125 lines)
- `package.json` - Node.js configuration for image optimization tools
- `tools/optimize-images.js` - Image optimization script using Sharp library

The application runs as static HTML/CSS/JS for deployment but includes optional Node.js tools for image optimization.

## Key Features to Maintain

- **22 Major Arcana cards** from Rider-Waite Smith deck
- **Ultra-secure random drawing** using crypto.getRandomValues + mouse entropy
- **3D flip animation** for card reveal
- **Responsive design** optimized for mobile and desktop
- **Brand colors**: Gold (#A68245), Black (#0A0A0A), White
- **Animated particles** for ambiance

## Image Structure

Card images are organized with optimized WebP versions:
```
/images/
├── logo/
│   ├── logo_LaTarotAcademie.png
│   └── IPHM_logo.jpg
└── major/
    ├── 00-fool.png          # Original fallback
    ├── 00-fool-300w.webp    # Desktop optimized
    ├── 00-fool-150w.webp    # Mobile optimized
    └── ... (22 cards × 3 versions = 66 files)
```

Image specifications:
- **Original**: PNG format, 600x900px
- **WebP Desktop**: 300px width, 85% quality
- **WebP Mobile**: 150px width, 85% quality
- **Total reduction**: 97.8% (64.8MB → 1.5MB)
- **Automatic fallback**: WebP → PNG for compatibility

## Development Guidelines

### Running Locally
```bash
# Option 1: Simple HTTP server
python -m http.server 8000

# Option 2: Using npm (after npm install)
npm run serve

# Option 3: Live Server
npx live-server --port=8000
```

### Key Configuration Points
- Images use relative paths: `./images/major/` with WebP optimization
- Brand colors in CSS: Gold (#A68245), Black (#0A0A0A), White (#FFFFFF)
- Card data stored in `tarotDeck` array with French names and descriptions
- Content Security Policy (CSP) configured for XSS protection
- All external links use `rel="noopener noreferrer"` for security

### Deployment
The application is deployed on GitHub Pages:
1. Repository: https://github.com/PhuvatatDev/la_tarot_academie
2. Live URL: https://PhuvatatDev.github.io/la_tarot_academie/
3. Deployment: Automatic from main branch
4. Performance: <1s load time on 4G, <2s on 3G

## Important Technical Details

### Security Features
- **XSS Protection**: No innerHTML usage, secure DOM manipulation only
- **CSP Headers**: Content Security Policy prevents script injection
- **Secure Links**: All external links use rel="noopener noreferrer"
- **Crypto Random**: Uses crypto.getRandomValues + mouse entropy for true randomness

### Performance Optimizations
- **WebP Images**: 97.8% size reduction with PNG fallback
- **Lazy Loading**: Images loaded on demand
- **CSS Animations**: Hardware-accelerated transforms
- **Local Storage**: Client-side card saving

### Build Tools
```bash
# Optimize images (requires npm install)
npm run optimize-images

# Build for production
npm run build
```

### Testing Commands
The project includes several npm scripts:
- `npm run serve` - Launch development server
- `npm run optimize-images` - Convert PNG to WebP
- `npm run build` - Prepare for production

### Recent Security Improvements (November 2024)
1. **Fixed XSS vulnerabilities** in drawCard() and toggleCardInfo() functions
2. **Added CSP meta tag** to prevent code injection
3. **Secured external links** with rel="noopener noreferrer"
4. **Implemented WebP optimization** reducing load time by 80%

### Code Quality Standards
- Vanilla JavaScript ES6+ (no frameworks)
- Semantic HTML5 structure
- CSS3 with custom properties
- Mobile-first responsive design
- WCAG accessibility compliance