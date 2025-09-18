// LA Tarot Académie - JavaScript

// === CONFIGURATION GITHUB PAGES ===
// Variables de configuration pour le déploiement sur GitHub Pages
const GITHUB_USERNAME = 'PhuvatatDev';  // Nom d'utilisateur GitHub
const REPO_NAME = 'la_tarot_academie';  // Nom du repository
const BRANCH = 'main';                  // Branche de déploiement

// === DÉFINITION DU JEU DE TAROT ===
// Tableau contenant les 22 Arcanes Majeurs du Tarot Rider-Waite Smith
// Chaque carte a un ID, nom, type, mots-clés et chemin d'image
const tarotDeck = [
    { id: 0, name: "Le Mat", type: "major", keywords: "Nouveaux départs, spontanéité, innocence", image: "00-le-mat.png" },
    { id: 1, name: "Le Bateleur", type: "major", keywords: "Volonté, pouvoir, action", image: "01-le-bateleur.png" },
    { id: 2, name: "La Papesse", type: "major", keywords: "Intuition, mystère, sagesse", image: "02-la-papesse.png" },
    { id: 3, name: "L'Impératrice", type: "major", keywords: "Féminité, créativité, abondance", image: "03-l-imperatrice.png" },
    { id: 4, name: "L'Empereur", type: "major", keywords: "Autorité, structure, paternité", image: "04-l-empereur.png" },
    { id: 5, name: "Le Pape", type: "major", keywords: "Tradition, enseignement, spiritualité", image: "05-le-pape.png" },
    { id: 6, name: "L'Amoureux", type: "major", keywords: "Choix, amour, harmonie", image: "06-l-amoureux.png" },
    { id: 7, name: "Le Chariot", type: "major", keywords: "Victoire, détermination, contrôle", image: "07-le-chariot.png" },
    { id: 8, name: "La Justice", type: "major", keywords: "Équité, vérité, loi", image: "08-la-justice.png" },
    { id: 9, name: "L'Hermite", type: "major", keywords: "Introspection, sagesse, solitude", image: "09-l-hermite.png" },
    { id: 10, name: "La Roue de Fortune", type: "major", keywords: "Cycles, destin, chance", image: "10-la-roue-de-fortune.png" },
    { id: 11, name: "La Force", type: "major", keywords: "Courage, patience, maîtrise", image: "11-la-force.png" },
    { id: 12, name: "Le Pendu", type: "major", keywords: "Sacrifice, lâcher-prise, perspective", image: "12-le-pendu.png" },
    { id: 13, name: "L'Arcane sans Nom", type: "major", keywords: "Transformation, fin, renouveau", image: "13-l-arcane-sans-nom.png" },
    { id: 14, name: "Tempérance", type: "major", keywords: "Équilibre, modération, patience", image: "14-temperance.png" },
    { id: 15, name: "Le Diable", type: "major", keywords: "Attachement, illusion, matérialisme", image: "15-le-diable.png" },
    { id: 16, name: "La Maison Dieu", type: "major", keywords: "Chaos, révélation, libération", image: "16-la-maison-dieu.png" },
    { id: 17, name: "L'Étoile", type: "major", keywords: "Espoir, inspiration, sérénité", image: "17-l-etoile.png" },
    { id: 18, name: "La Lune", type: "major", keywords: "Illusion, peur, subconscient", image: "18-la-lune.png" },
    { id: 19, name: "Le Soleil", type: "major", keywords: "Joie, succès, vitalité", image: "19-le-soleil.png" },
    { id: 20, name: "Le Jugement", type: "major", keywords: "Renaissance, appel, éveil", image: "20-le-jugement.png" },
    { id: 21, name: "Le Monde", type: "major", keywords: "Accomplissement, complétude, voyage", image: "21-le-monde.png" }
];

// === FONCTION UTILITAIRE POUR LES IMAGES ===
// Construit le chemin complet vers l'image de la carte
// @param {Object} card - Objet carte contenant la propriété 'image'
// @return {String} - Chemin relatif vers l'image de la carte
function getImageUrl(card) {
    return `./images/major/${card.image}`;
}

// === SYSTÈME DE RANDOMISATION AVANCÉ ===
// Classe implémentant un système de randomisation ultra-sécurisé
// Combine crypto.getRandomValues + mouvements de souris + timestamp
class UltraRandomizer {
    constructor() {
        this.entropy = 0;           // Valeur d'entropie accumulée
        this.mouseEntropy = [];      // Tableau stockant les positions de souris
        this.initMouseTracking();    // Démarre le tracking de la souris
    }

    // Méthode pour initialiser le tracking des mouvements de souris
    // Collecte l'entropie basée sur les mouvements de la souris (max 100 valeurs)
    initMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            // Maintient un buffer de 100 positions maximum
            if (this.mouseEntropy.length < 100) {
                this.mouseEntropy.push(e.clientX + e.clientY);
            } else {
                this.mouseEntropy.shift();  // Retire la plus ancienne
                this.mouseEntropy.push(e.clientX + e.clientY);
            }
            // Calcule l'entropie comme somme modulo 1000
            this.entropy = this.mouseEntropy.reduce((a, b) => a + b, 0) % 1000;
        });
    }

    // Méthode principale pour obtenir une carte aléatoire
    // Combine plusieurs sources d'entropie pour un maximum d'aléatoire
    // @return {Object} - Une carte aléatoire du deck
    getRandomCard() {
        // Source 1: API Crypto sécurisée du navigateur
        const cryptoArray = new Uint32Array(1);
        crypto.getRandomValues(cryptoArray);

        // Source 2: Timestamp actuel en millisecondes
        const timestamp = Date.now();

        // Source 3: Entropie accumulée des mouvements de souris
        const mouseInfluence = this.entropy || Math.random() * 1000;

        // Combine toutes les sources et sélectionne une carte
        const combinedRandom = (cryptoArray[0] + timestamp + mouseInfluence) % tarotDeck.length;

        return tarotDeck[Math.floor(combinedRandom)];
    }
}

// Instance globale du système de randomisation
const randomizer = new UltraRandomizer();

// === SYSTÈME DE PARTICULES ANIMÉES ===
// Crée les particules dorées flottantes pour l'ambiance mystique
// Génère 50 particules avec des tailles et animations aléatoires
function createParticles() {
    const particlesContainer = document.getElementById('particles');

    // Boucle pour créer 50 particules
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Taille aléatoire entre 2px et 7px
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Position horizontale aléatoire
        particle.style.left = Math.random() * 100 + '%';

        // Délai d'animation aléatoire (0-8 secondes)
        particle.style.animationDelay = Math.random() * 8 + 's';

        // Durée d'animation aléatoire (8-13 secondes)
        particle.style.animationDuration = (Math.random() * 5 + 8) + 's';

        particlesContainer.appendChild(particle);
    }
}

// === CRÉATION DU CONTENU DE LA CARTE ===
// Fonction sécurisée pour créer le contenu HTML de la carte
// Gère l'affichage de l'image ou d'un placeholder en cas d'erreur
// @param {Object} card - L'objet carte à afficher
// @return {HTMLElement} - Élément DOM contenant le contenu de la carte
function createCardContent(card) {
    // Vérifie si la carte a une image définie
    if (card.image) {
        // Crée l'élément image
        const img = document.createElement('img');
        img.src = getImageUrl(card);
        img.alt = card.name;  // Texte alternatif pour l'accessibilité
        img.className = 'card-image';

        // Gestion d'erreur: affiche un placeholder si l'image ne charge pas
        img.onerror = function() {
            const fallbackElement = createFallbackElement(card);
            img.parentElement.replaceChild(fallbackElement, img);
        };
        return img;
    } else {
        return createFallbackElement(card);
    }
}

// === PLACEHOLDER DE SECOURS POUR LES CARTES ===
// Crée un élément de remplacement stylisé si l'image ne charge pas
// Affiche le numéro, nom et mots-clés de la carte
// @param {Object} card - L'objet carte à représenter
// @return {HTMLElement} - Élément placeholder stylisé
function createFallbackElement(card) {
    // Container principal du placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'card-image-placeholder';

    // Affiche le numéro de l'arcane majeur (0-21)
    const numberSpan = document.createElement('span');
    numberSpan.className = 'card-number';
    numberSpan.textContent = card.id;
    placeholder.appendChild(numberSpan);

    // Symbole décoratif (utilise '✦' par défaut)
    const symbolDiv = document.createElement('div');
    symbolDiv.className = 'card-symbol';
    symbolDiv.textContent = card.symbol || '✦';
    placeholder.appendChild(symbolDiv);

    // Nom de la carte en grand
    const nameDiv = document.createElement('div');
    nameDiv.className = 'card-name';
    nameDiv.textContent = card.name;
    placeholder.appendChild(nameDiv);

    // Mots-clés associés à la carte
    const keywordsDiv = document.createElement('div');
    keywordsDiv.className = 'card-keywords';
    keywordsDiv.textContent = card.keywords;
    placeholder.appendChild(keywordsDiv);

    return placeholder;
}

// === FONCTION PRINCIPALE DE TIRAGE DE CARTE ===
// Gère tout le processus de tirage: animation, sélection, affichage
// Sécurisée contre les injections XSS et manipulations DOM
function drawCard() {
    const button = document.getElementById('drawButton');
    const overlay = document.getElementById('cardOverlay');
    const cardFlip = document.getElementById('cardFlip');
    const cardFace = document.getElementById('cardFace');

    // Démarre l'animation de mélange (pulsation du bouton)
    button.classList.add('shuffling');
    button.innerHTML = '<span class="spinning-star">✦</span>';  // Étoile qui tourne

    // Délai de 1.5s pour l'effet de suspense
    setTimeout(() => {
        // Sélection aléatoire d'une carte
        const selectedCard = randomizer.getRandomCard();

        // Nettoyage sécurisé du contenu précédent
        while (cardFace.firstChild) {
            cardFace.removeChild(cardFace.firstChild);
        }

        // Ajout sécurisé du nouveau contenu (vérifie que c'est un Node valide)
        const cardContent = createCardContent(selectedCard);
        if (cardContent instanceof Node) {
            cardFace.appendChild(cardContent);
        }

        // Active la modal avec animation de fondu
        overlay.classList.add('active');

        // Déclenche l'animation 3D de retournement après 100ms
        setTimeout(() => {
            cardFlip.classList.add('flipped');
        }, 100);

        // Réinitialise le bouton à son état normal
        button.classList.remove('shuffling');
        button.textContent = 'TIRE UNE CARTE ICI';
    }, 1500);
}

// === FONCTION DE FERMETURE DE LA MODAL ===
// Ferme la modal avec animations de sortie
// Retourne la carte à sa position initiale avant de cacher l'overlay
function closeCard() {
    const overlay = document.getElementById('cardOverlay');
    const cardFlip = document.getElementById('cardFlip');

    // Retourne d'abord la carte (animation inverse)
    cardFlip.classList.remove('flipped');

    // Attend la fin de l'animation avant de cacher l'overlay
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 300);
}

// === INITIALISATION DE L'APPLICATION ===
// Point d'entrée principal - s'exécute quand le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Crée les particules d'ambiance
    createParticles();

    // === GESTIONNAIRES D'ÉVÉNEMENTS ===
    // Bouton de tirage de carte
    document.getElementById('drawButton').addEventListener('click', drawCard);

    // Bouton de fermeture de la modal
    document.getElementById('closeButton').addEventListener('click', closeCard);

    // Fermeture en cliquant sur le fond de l'overlay
    document.getElementById('cardOverlay').addEventListener('click', (e) => {
        // Vérifie que le clic est sur l'overlay et non sur la carte
        if (e.target === e.currentTarget) {
            closeCard();
        }
    });

    // === POPUP IPHM ===
    // Gestionnaires pour la popup d'information IPHM
    const iphmLogo = document.getElementById('iphmLogo');
    const iphmContainer = document.querySelector('.iphm-logo-container');
    const iphmPopup = document.getElementById('iphmPopup');
    const iphmClose = document.getElementById('iphmClose');

    // Ouvrir la popup au clic sur le logo ou le container
    if (iphmLogo) {
        iphmLogo.addEventListener('click', () => {
            iphmPopup.classList.add('active');
        });
    }

    // Ouvrir aussi au clic sur tout le container (texte + logo)
    if (iphmContainer) {
        iphmContainer.addEventListener('click', () => {
            iphmPopup.classList.add('active');
        });
    }

    // Fermer la popup avec le bouton de fermeture
    if (iphmClose) {
        iphmClose.addEventListener('click', () => {
            iphmPopup.classList.remove('active');
        });
    }

    // Fermer la popup en cliquant sur le fond
    if (iphmPopup) {
        iphmPopup.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                iphmPopup.classList.remove('active');
            }
        });
    }
});