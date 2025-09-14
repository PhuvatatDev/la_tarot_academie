// LA Tarot Académie - JavaScript

// Configuration - CHANGEZ CES VALEURS
const GITHUB_USERNAME = 'VOTRE_USERNAME'; // Remplacez par votre username GitHub
const REPO_NAME = 'tarot-academie'; // Nom de votre repo
const BRANCH = 'main'; // ou 'master' selon votre configuration

// Définition des 22 Arcanes Majeurs du Tarot Rider-Waite Smith
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

// Fonction pour obtenir l'URL de l'image
function getImageUrl(card) {
    return `./images/major/${card.image}`;
}

// Système de randomisation ultra-aléatoire
class UltraRandomizer {
    constructor() {
        this.entropy = 0;
        this.mouseEntropy = [];
        this.initMouseTracking();
    }

    initMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            if (this.mouseEntropy.length < 100) {
                this.mouseEntropy.push(e.clientX + e.clientY);
            } else {
                this.mouseEntropy.shift();
                this.mouseEntropy.push(e.clientX + e.clientY);
            }
            this.entropy = this.mouseEntropy.reduce((a, b) => a + b, 0) % 1000;
        });
    }

    getRandomCard() {
        const cryptoArray = new Uint32Array(1);
        crypto.getRandomValues(cryptoArray);

        const timestamp = Date.now();
        const mouseInfluence = this.entropy || Math.random() * 1000;

        const combinedRandom = (cryptoArray[0] + timestamp + mouseInfluence) % tarotDeck.length;

        return tarotDeck[Math.floor(combinedRandom)];
    }
}

const randomizer = new UltraRandomizer();

// Création des particules
function createParticles() {
    const particlesContainer = document.getElementById('particles');

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 8) + 's';

        particlesContainer.appendChild(particle);
    }
}

// Fonction pour créer le contenu de la carte (VERSION SÉCURISÉE)
function createCardContent(card) {
    // Si la carte a une image définie
    if (card.image) {
        const img = document.createElement('img');
        img.src = getImageUrl(card);
        img.alt = card.name;
        img.className = 'card-image';
        img.onerror = function() {
            // En cas d'erreur, remplacer par le contenu de fallback
            const fallbackElement = createFallbackElement(card);
            img.parentElement.replaceChild(fallbackElement, img);
        };
        return img;
    } else {
        return createFallbackElement(card);
    }
}

// Fonction de fallback si l'image ne charge pas (VERSION SÉCURISÉE)
function createFallbackElement(card) {
    const placeholder = document.createElement('div');
    placeholder.className = 'card-image-placeholder';

    // Numéro de la carte (arcane majeur)
    const numberSpan = document.createElement('span');
    numberSpan.className = 'card-number';
    numberSpan.textContent = card.id;
    placeholder.appendChild(numberSpan);

    const symbolDiv = document.createElement('div');
    symbolDiv.className = 'card-symbol';
    symbolDiv.textContent = card.symbol || '✦';
    placeholder.appendChild(symbolDiv);

    const nameDiv = document.createElement('div');
    nameDiv.className = 'card-name';
    nameDiv.textContent = card.name;
    placeholder.appendChild(nameDiv);

    const keywordsDiv = document.createElement('div');
    keywordsDiv.className = 'card-keywords';
    keywordsDiv.textContent = card.keywords;
    placeholder.appendChild(keywordsDiv);

    return placeholder;
}

// Fonction de tirage (VERSION SÉCURISÉE)
function drawCard() {
    const button = document.getElementById('drawButton');
    const overlay = document.getElementById('cardOverlay');
    const cardFlip = document.getElementById('cardFlip');
    const cardFace = document.getElementById('cardFace');

    // Animation de mélange
    button.classList.add('shuffling');
    button.textContent = 'Mélange des énergies...';

    setTimeout(() => {
        const selectedCard = randomizer.getRandomCard();

        // Vider le contenu précédent de manière sécurisée
        while (cardFace.firstChild) {
            cardFace.removeChild(cardFace.firstChild);
        }

        // Ajouter le nouveau contenu de manière sécurisée
        const cardContent = createCardContent(selectedCard);
        if (cardContent instanceof Node) {
            cardFace.appendChild(cardContent);
        }

        // Afficher l'overlay
        overlay.classList.add('active');

        // Déclencher l'animation de flip après un court délai
        setTimeout(() => {
            cardFlip.classList.add('flipped');
        }, 100);

        // Réinitialiser le bouton
        button.classList.remove('shuffling');
        button.textContent = 'Tirer une Carte';
    }, 1500);
}

// Fonction pour fermer la carte
function closeCard() {
    const overlay = document.getElementById('cardOverlay');
    const cardFlip = document.getElementById('cardFlip');

    cardFlip.classList.remove('flipped');

    setTimeout(() => {
        overlay.classList.remove('active');
    }, 300);
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des particules
    createParticles();

    // Event listeners
    document.getElementById('drawButton').addEventListener('click', drawCard);
    document.getElementById('closeButton').addEventListener('click', closeCard);
    document.getElementById('cardOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeCard();
        }
    });
});