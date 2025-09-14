# 🔮 Outil de Tirage Tarot - Webinaire Psycho Tarot

Outil interactif de tirage de cartes de tarot pour webinaires en direct. Permet aux participants de tirer leur carte personnelle pendant la présentation.

## 📋 Description

Application web simple permettant aux participants d'un webinaire de tirer une carte de tarot en temps réel. Conçue pour **La Tarot Académie** et les formations de Psycho-Tarot.

## ✨ Fonctionnalités

- **22 Arcanes Majeurs** du Tarot Rider-Waite Smith
- **Tirage aléatoire ultra-sécurisé** (crypto.getRandomValues + entropie souris)
- **Animation de tirage** avec effet flip 3D
- **Interface responsive** (mobile/desktop)
- **Design professionnel** aux couleurs de la marque
- **Particules animées** pour l'ambiance
- **Possibilité de retirer** plusieurs fois

## 🎨 Design

- **Couleurs** : Or (#A68245), Noir (#0A0A0A), Blanc
- **Style** : Moderne, épuré, mystique
- **Responsive** : Optimisé mobile et desktop

## 🚀 Installation et Déploiement

### Option 1 : GitHub Pages (Recommandée)

1. **Créer le repository**
   ```bash
   # Créer un nouveau repo sur GitHub
   # Nommer : tarot-webinaire (ou autre)
   # Rendre PUBLIC pour GitHub Pages gratuit
   ```

2. **Ajouter les fichiers**
   ```
   /tarot-webinaire/
   ├── index.html          # Le code HTML complet
   ├── README.md           # Ce fichier
   └── /images/            # Dossier pour les images des cartes
       ├── /major/         # 22 arcanes majeurs
       │   ├── 00-fool.jpg
       │   ├── 01-magician.jpg
       │   └── ...
       └── /minor/         # 56 arcanes mineurs (optionnel)
   ```

3. **Activer GitHub Pages**
   - Aller dans Settings → Pages
   - Source : "Deploy from branch"
   - Branch : main
   - Folder : / (root)
   - Save

4. **Accéder au site**
   ```
   https://VOTRE-USERNAME.github.io/tarot-webinaire/
   ```

### Option 2 : Hébergement local

```bash
# Ouvrir directement index.html dans le navigateur
# Ou utiliser un serveur local simple :
python -m http.server 8000
# Puis aller sur http://localhost:8000
```

## 📁 Structure des Images

### Nommage des fichiers
```
/images/major/
├── 00-fool.jpg         # Le Mat
├── 01-magician.jpg     # Le Bateleur  
├── 02-high-priestess.jpg # La Papesse
├── 03-empress.jpg      # L'Impératrice
├── 04-emperor.jpg      # L'Empereur
├── 05-hierophant.jpg   # Le Pape
├── 06-lovers.jpg       # Les Amoureux
├── 07-chariot.jpg      # Le Chariot
├── 08-strength.jpg     # La Force
├── 09-hermit.jpg       # L'Hermite
├── 10-wheel.jpg        # La Roue de Fortune
├── 11-justice.jpg      # La Justice
├── 12-hanged.jpg       # Le Pendu
├── 13-death.jpg        # La Mort
├── 14-temperance.jpg   # Tempérance
├── 15-devil.jpg        # Le Diable
├── 16-tower.jpg        # La Tour
├── 17-star.jpg         # L'Étoile
├── 18-moon.jpg         # La Lune
├── 19-sun.jpg          # Le Soleil
├── 20-judgement.jpg    # Le Jugement
└── 21-world.jpg        # Le Monde
```

### Format des images
- **Format** : JPG ou PNG
- **Taille recommandée** : 300x450px (ratio 2:3)
- **Poids** : < 200Ko par image
- **Qualité** : 85% suffisant

## ⚙️ Configuration

### Modifier les URLs des images
Dans le code HTML, section JavaScript, modifier :
```javascript
const imageBasePath = "https://raw.githubusercontent.com/VOTRE-USERNAME/tarot-webinaire/main/images/major/";
```

### Personnaliser les textes
- **Titre** : Modifier "LA TAROT ACADÉMIE" 
- **Sous-titre** : "Formation Professionnelle Psycho-Tarot"
- **Texte de bienvenue** : Section `.welcome-text`
- **Section promo** : Modifier le CTA et les liens

## 🎯 Utilisation pendant un Webinaire

1. **Partager le lien** aux participants
2. **Demander aux participants** de formuler une question
3. **Invitation à cliquer** sur "Tirer une Carte"
4. **Chaque participant** voit sa carte personnelle
5. **Possibilité de retirer** si souhaité

## 🔧 Personnalisation Avancée

### Ajouter des arcanes mineurs
Modifier la base de données dans le JavaScript :
```javascript
const allCards = [...majorArcana, ...minorArcana];
```

### Modifier les couleurs
Dans le CSS, section `:root` :
```css
:root {
    --gold: #A68245;      /* Couleur principale */
    --black: #0A0A0A;     /* Arrière-plan */
    --white: #FFFFFF;     /* Texte */
}
```

### Ajouter Google Analytics
Avant `</head>` :
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 📱 Compatibilité

- ✅ **Chrome** 80+
- ✅ **Firefox** 75+
- ✅ **Safari** 13+
- ✅ **Edge** 80+
- ✅ **Mobile** iOS/Android

## 🛠️ Technologies

- **HTML5** (structure)
- **CSS3** (animations, responsive)
- **JavaScript Vanilla** (logique)
- **GitHub Pages** (hébergement)

## 📞 Support

Pour questions techniques ou modifications :
- Ouvrir une issue sur GitHub
- Contacter le développeur

## 📄 Licence

Usage personnel et professionnel autorisé pour **La Tarot Académie**.

---

**Développé avec ❤️ pour les webinaires Psycho-Tarot**