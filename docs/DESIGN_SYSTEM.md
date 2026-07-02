# Design System - LA Tarot Académie (tirage de carte)

Référence visuelle pour le redesign de la page de tirage. Adapté du site officiel
`la-tarot-academy-website` (Next.js/Tailwind) vers du **HTML/CSS/JS vanilla**.

Source de vérité originale : `la-tarot-academy-website/src/app/globals.css` et `.claude/DESIGN_SYSTEM.md`.

---

## 1. Couleurs (valeurs HEX exactes)

### Or (accent décoratif UNIQUEMENT, jamais un bouton)
| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#A68245` | Or principal, accents, soulignés |
| `--primary-light` | `#C9A66B` | Hover |
| `--primary-dark` | `#8B6914` | Pressé |
| `--primary-muted` | `#D4C4A8` | Désactivé |

### Bordeaux (couleur d'ACTION unique : tous les CTA / boutons)
| Token | Hex | Usage |
|-------|-----|-------|
| `--tertiary` | `#722F37` | Tous les boutons d'action |
| `--tertiary-light` | `#9A4A54` | Hover |
| `--tertiary-dark` | `#4A1F24` | Pressé |

### Brun secondaire (ancrage, footer)
| Token | Hex |
|-------|-----|
| `--secondary` | `#4A3728` |
| `--surface-dark` | `#4A3728` |
| `--surface-dark-elevated` | `#2E2218` |

### Surfaces
| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#F5F0E8` | Fond beige chaleureux (80-90% de la page) |
| `--surface-soft` | `#E8E0D5` | Beige moyen, dividers |
| `--surface-card` | `#FAF7F2` | Blanc cassé, cartes flottantes |

### Texte
| Token | Hex | Usage |
|-------|-----|-------|
| `--ink` | `#1A1A1A` | Titres, texte principal |
| `--body` | `#3D3A37` | Lecture courante |
| `--muted` | `#6B5344` | Sous-titres |
| `--muted-soft` | `#9A9590` | Captions |
| `--on-dark` | `#FAF7F2` | Texte cream sur fond foncé |

### États
| Token | Hex |
|-------|-----|
| `--success` | `#4A7C59` |
| `--warning` | `#D4A03E` |
| `--error` | `#A63D40` |
| `--hairline` | `#E8E0D5` (bordures 1px) |

### Règles couleur (doctrine 2026-05-21)
- **Bordeaux = action** : tous les CTA, pills, boutons cliquables.
- **Or = décor** : eyebrows, prix, soulignés. JAMAIS un bouton.
- **Cream = respiration** ; le beige `#F5F0E8` couvre 80-90% de la page.
- **1 seule rupture foncée par page** (section bordeaux full-width).

---

## 2. Typographie

Polices en WOFF2 local (0 dépendance Google). Pour cette page vanilla, on peut les
charger via `@font-face` (fichiers dans `la-tarot-academy-website/public/fonts/`) ou
via Google Fonts en fallback.

| Police | Rôle |
|--------|------|
| **Cormorant Garamond** (300-700) | Titres display (hero, sections) |
| **Inter** (300-700) | Corps de texte, UI, boutons |
| **Pinyon Script** (400) | Calligraphie titres de section (rare) |
| **Caveat** (400-700) | Accent manuscrit décoratif |

### Échelle (extrait utile pour la page de tirage)
| Token | Police | Mobile | Desktop (≥1024) | Line-height | Usage |
|-------|--------|--------|-----------------|-------------|-------|
| display-xl | Cormorant 400 | 32px | 64px | 1.1 | Hero (titre principal) |
| display-lg | Cormorant 500 | 28px | 48px | 1.15 | Titre de page |
| display-md | Cormorant 500 | 24px | 36px | 1.2 | H2 section |
| body-lg | Inter 400 | 16px | 18px | 1.55 | Intro, leads |
| body-md | Inter 400 | 15px | 16px | 1.6 | Lecture standard (significations cartes) |
| caption-uppercase | Inter 500 | 11px | 12px | letter-spacing 0.125em | Eyebrows (MAJUSCULES) |
| text-button | Inter 500 | 14px | 15px | 1.3 | Libellés boutons |

Règle : `lining-nums` sur Cormorant dès qu'il y a des chiffres + majuscules (ex "35 CHF").

---

## 3. Formes, ombres, effets

### Rayons (border-radius)
- Boutons d'action / pills : `9999px` (`rounded-full`)
- Cartes standard : `12px` à `16px`
- Grandes cartes : `24px`
- Règle imbrication : `rayon_interne = rayon_externe - padding`

### Ombres
- **Atmospheric** (obligatoire sur toute carte flottante) :
  `0 30px 80px -30px rgba(74, 55, 40, 0.15)`
- Philosophie : color-block d'abord, ombre rare. 1 drop-shadow max pour un cutout produit.

### Effets signature (optionnels pour la page de tirage)
- **Glassmorphism** (PillButton / LiquidGlass) : `backdrop-filter: blur(8px) saturate(130%)`
  + ombre composite multi-couches donnant un relief bombé.
- **HandUnderline** : soulignés SVG dessinés à la main (couleur or par défaut).

### Interactions - doctrine "pression physique"
Un bouton s'enfonce, ne rebondit jamais vers le haut.
- Hover : `transform: scale(0.99) translateY(1px)`
- Active : `transform: scale(0.96) translateY(2px)`
- Timing : 150ms micro-interactions, 250ms normal, 400ms lent.

---

## 4. Responsive

Breakpoints stricts (mobile-first) :
- Mobile : `< 768px` (défaut)
- `md:` `768px` (tablette)
- `lg:` `1024px` (laptop — la typo et le spacing montent d'un cran ici)
- `xl:` `1280px` (grand écran)

Interdits : `sm:` (640), `2xl:` (1536), breakpoints arbitraires.

Hauteur courte à gérer : `@media (max-height: 800px)` (laptop 13"),
`@media (max-height: 600px)` (mobile paysage).

### Spacing (2 paliers)
| Token | Mobile | Desktop |
|-------|--------|---------|
| space-xs | 12px | 16px |
| space-s | 16px | 24px |
| space-m | 24px | 36px |
| space-l | 32px | 48px |
| space-xl | 48px | 72px |
| section | 64px | 128px |

---

## 5. Direction visuelle

Positionnement : "École portée par une fondatrice signature" (registre Le Cordon Bleu /
Aesop / Masterclass). Pédagogique premium, symbolique mesurée. **Pas** mystique/charlatan.

Pour la page de tirage, cela signifie :
- Fond beige chaleureux, cartes cream flottantes avec ombre atmospheric.
- Titre en Cormorant, corps en Inter.
- Un seul bouton d'action bordeaux ("Tirer une carte").
- L'or réservé aux détails (numéro d'arcane, souligné, filet décoratif).
- Animations sobres (flip 3D de la carte, léger parallax), pas de surcharge mystique.

---

## 6. Fichiers sources à consulter (projet website)
| Besoin | Fichier |
|--------|---------|
| Tokens couleurs/typo/spacing | `src/app/globals.css` |
| Export TS des tokens | `src/lib/theme.ts` |
| Chargement polices | `src/app/layout.tsx` + `public/fonts/` |
| Doctrine complète | `.claude/DESIGN_SYSTEM.md` |
| Bouton pill (référence CTA) | `src/components/ui/PillButton.tsx` |
| Glass card | `src/components/ui/LiquidGlass.tsx` |
| Souligné manuscrit | `src/components/ui/HandUnderline.tsx` |
