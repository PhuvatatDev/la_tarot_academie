// LA Tarot Académie - JavaScript

// === CONFIGURATION GITHUB PAGES ===
// Variables de configuration pour le déploiement sur GitHub Pages
const GITHUB_USERNAME = 'PhuvatatDev';  // Nom d'utilisateur GitHub
const REPO_NAME = 'la_tarot_academie';  // Nom du repository
const BRANCH = 'main';                  // Branche de déploiement

// === DÉFINITION DU JEU DE TAROT ===
// Tableau contenant les 22 Arcanes Majeurs du Tarot Rider-Waite Smith
// Chaque carte a un ID, nom, type, mots-clés, description et chemin d'image
const tarotDeck = [
    {
        id: 0,
        name: "Le Fou",
        type: "major",
        keywords: "Liberté – Nouveaux commencements – Spontanéité",
        description: "Ici, la carte du Fou t'invite à embrasser la liberté et à accueillir les nouveaux commencements avec légèreté. Elle t'encourage à faire preuve de spontanéité, à te libérer des peurs et à suivre tes désirs, même si le chemin te semble incertain. Laisse-toi surprendre par l'inconnu, amuse-toi dans chaque étape du voyage et fais confiance à l'univers pour t'ouvrir de nouvelles perspectives et opportunités.",
        image: "00-le-mat.png"
    },
    {
        id: 1,
        name: "Le Magicien",
        type: "major",
        keywords: "Création – Pouvoir intérieur – Action",
        description: "Ici, la carte du Magicien t'invite à prendre les rênes de ta réalité et à activer ton pouvoir intérieur. Elle t'encourage à transformer tes idées en actions concrètes, à utiliser tes talents et tes ressources avec créativité et détermination. C'est le moment idéal pour initier de nouveaux projets, manifester tes objectifs et avancer avec confiance sur ton chemin. L'univers est prêt à te soutenir, à condition que tu sois aligné(e) et concentré(e) sur ce que tu souhaites créer.",
        image: "01-le-bateleur.png"
    },
    {
        id: 2,
        name: "La Grande-Prêtresse",
        type: "major",
        keywords: "Intuition – Sagesse – Réceptivité",
        description: "Ici, la carte de la Grande-Prêtresse t'invite à te connecter à ton intuition et à ta sagesse intérieure. Elle t'encourage à observer attentivement ce qui se passe en toi et autour de toi, sans intervenir, et à accueillir les connaissances cachées et les révélations au fil du temps. C'est un moment pour écouter ta voix intérieure, accueillir les apprentissages et laisser émerger la vérité à son rythme. La patience et la réceptivité sont tes alliées : tout se met en place au moment juste, sans précipitation.",
        image: "02-la-papesse.png"
    },
    {
        id: 3,
        name: "L'Impératrice",
        type: "major",
        keywords: "Abondance – Créativité – Fertilité",
        description: "Ici, la carte de l'Impératrice t'invite à célébrer l'abondance de la vie et à laisser ta créativité s'exprimer librement. Elle t'encourage à nourrir avec soin les projets qui te tiennent à cœur et à prendre pleinement ta place, en affirmant ton pouvoir et ton authenticité. C'est un appel à t'ancrer dans la beauté du moment présent, à cultiver la croissance avec patience et amour, et à reconnaître la force nourrissante de ton énergie féminine.",
        image: "03-l-imperatrice.png"
    },
    {
        id: 4,
        name: "L'Empereur",
        type: "major",
        keywords: "Stabilité – Ancrage – Autorité",
        description: "Ici, la carte de l'Empereur t'invite à t'ancrer et à établir des bases solides dans ta vie. Elle t'encourage à prendre ta place avec assurance, à affirmer ton autorité intérieure et à organiser ton espace pour que tes actions soient efficaces et alignées. C'est un appel à la discipline, à la responsabilité et à la maîtrise de soi, car c'est dans cette stabilité intérieure que se révèle ton véritable pouvoir et ton leadership.",
        image: "04-l-empereur.png"
    },
    {
        id: 5,
        name: "Le Hiérophante",
        type: "major",
        keywords: "Sagesse – Spiritualité – Transmission",
        description: "Ici, la carte du Hiérophante t'invite à te connecter à la sagesse et à la spiritualité qui t'entourent. Elle t'encourage à t'inspirer des enseignements et des traditions éprouvées, et à nourrir ta quête intérieure avec des valeurs solides et des principes éthiques. C'est un appel à apprendre, à recevoir des conseils et à t'ouvrir à la connaissance collective, tout en respectant ton cheminement personnel et ton engagement spirituel.",
        image: "05-le-pape.png"
    },
    {
        id: 6,
        name: "Les Amoureux",
        type: "major",
        keywords: "Décision – Amour pour soi – Alignement",
        description: "Ici, la carte des Amoureux t'invite à faire des choix en conscience, guidé(e) par l'amour pour toi-même, l'authenticité et ton alignement intérieur. Elle t'encourage à respecter tes valeurs profondes, sans compromis dicté par la peur ou le besoin de plaire. C'est un appel à reconnaître la puissance des liens relationnels, qui peuvent agir comme miroir, catalyseur ou chemin vers une meilleure connaissance de toi-même. L'harmonie véritable se construit dans la liberté partagée, et non dans la dépendance.",
        image: "06-l-amoureux.png"
    },
    {
        id: 7,
        name: "Le Chariot",
        type: "major",
        keywords: "Détermination – Maîtrise de soi – Volonté",
        description: "Ici, la carte du Chariot t'invite à prendre le contrôle de ta vie et à avancer avec détermination vers tes objectifs. Elle t'encourage à agir avec confiance, à maîtriser tes émotions et à canaliser ton énergie pour progresser efficacement. C'est le moment de sortir de ta zone de confort, de prendre les commandes et de te lancer dans de nouvelles aventures avec courage et ambition.",
        image: "07-le-chariot.png"
    },
    {
        id: 8,
        name: "La Force",
        type: "major",
        keywords: "Courage – Maîtrise de soi – Patience",
        description: "Ici, la carte de la Force t'invite à faire face aux défis avec courage et calme. Elle t'encourage à puiser dans tes ressources intérieures, à maîtriser tes émotions et à avancer avec confiance. C'est un appel à la patience, à la persévérance et à l'endurance, car c'est souvent dans la douceur et la constance que se trouvent les clés pour surmonter les obstacles et réussir.",
        image: "11-la-force.png"
    },
    {
        id: 9,
        name: "L'Hermite",
        type: "major",
        keywords: "Introspection – Sagesse – Voyage intérieur",
        description: "Ici, la carte de l'Hermite t'invite à te retirer pour un temps d'introspection et de réflexion profonde. Elle t'encourage à te connecter à ta sagesse intérieure, à explorer tes pensées et tes émotions pour mieux te comprendre et avancer avec clarté. C'est un moment pour suivre ton propre chemin, en toute autonomie, et pour puiser dans la solitude les réponses aux questions importantes de ta vie.",
        image: "09-l-hermite.png"
    },
    {
        id: 10,
        name: "La Roue de la Fortune",
        type: "major",
        keywords: "Cycles – Chance – Destin",
        description: "Ici, la carte de la Roue de la Fortune t'invite à accueillir les changements et les cycles de la vie avec flexibilité et confiance. Elle t'encourage à reconnaître les opportunités et les moments de chance qui se présentent, souvent liés à tes choix ou actions passées. C'est un appel à accepter l'incertitude, à t'adapter aux retournements de situation et à te préparer à de nouvelles phases qui contribuent à ton cheminement et à ton évolution.",
        image: "10-la-roue-de-fortune.png"
    },
    {
        id: 11,
        name: "La Justice",
        type: "major",
        keywords: "Équilibre – Vérité – Responsabilité",
        description: "Ici, la carte de la Justice t'invite à faire preuve d'honnêteté et à assumer pleinement tes choix et actions. Elle t'encourage à rétablir l'équilibre, que ce soit dans ta vie intérieure ou dans tes situations extérieures. C'est un appel à réfléchir, à peser le pour et le contre, et à prendre la responsabilité des conséquences de tes décisions. La Justice te rappelle de trancher avec clarté et rigueur, tout en restant aligné(e) avec tes principes d'équité et de vérité.",
        image: "08-la-justice.png"
    },
    {
        id: 12,
        name: "Le Pendu",
        type: "major",
        keywords: "Lâcher-prise – Réflexion – Changement de perspective",
        description: "Ici, la carte du Pendu t'invite à la patience et à la réflexion. Elle t'encourage à ne pas forcer les choses, mais à prendre le temps de comprendre et d'accepter ce qui est. C'est un appel à accueillir les périodes d'immobilité comme des moments nécessaires pour ton évolution intérieure. Le Pendu te pousse à changer de perspective, à observer la situation sous un autre angle et à accepter que certains changements ne surviennent que lorsque tu es prêt(e) à lâcher prise.",
        image: "12-le-pendu.png"
    },
    {
        id: 13,
        name: "La Mort",
        type: "major",
        keywords: "Transformation – Fin – Renouveau",
        description: "Ici, la carte de la Mort t'invite à accueillir la fin d'un cycle et à te libérer des fardeaux du passé. Elle t'encourage à accepter les transitions, même difficiles, comme une opportunité de transformation et de renouveau. C'est un appel à te dépouiller de ce qui ne te sert plus pour laisser place à une version plus évoluée de toi-même. La Mort rappelle que chaque fin ouvre la voie à une renaissance et à de nouvelles perspectives.",
        image: "13-l-arcane-sans-nom.png"
    },
    {
        id: 14,
        name: "La Tempérance",
        type: "major",
        keywords: "Équilibre – Harmonie – Modération",
        description: "Ici, la carte de la Tempérance t'invite à retrouver l'équilibre et l'harmonie dans ta vie. Elle t'encourage à éviter les extrêmes, à faire preuve de modération et de patience, et à intégrer les nouvelles expériences avec douceur. C'est un appel à harmoniser les différentes parts de toi-même et à trouver le juste milieu entre le monde spirituel et matériel. La Tempérance rappelle que l'équilibre est un processus continu, guidé par la sagesse et la bienveillance envers soi-même.",
        image: "14-temperance.png"
    },
    {
        id: 15,
        name: "Le Diable",
        type: "major",
        keywords: "Illusion – Attachement – L'ego",
        description: "Ici, la carte du Diable t'invite à prendre conscience des illusions et des dépendances qui limitent ta vie. Elle t'encourage à identifier les comportements, relations ou attachements qui te retiennent et à assumer la responsabilité de ta propre liberté. C'est un appel à libérer ton énergie créative et spirituelle en te détachant des désirs immédiats, des croyances limitantes et des chaînes invisibles. Le Diable rappelle que ton pouvoir personnel te permet de dépasser l'ego et les influences qui entravent ton évolution.",
        image: "15-le-diable.png"
    },
    {
        id: 16,
        name: "La Tour",
        type: "major",
        keywords: "Effondrement – Reconstruction – Révélation",
        description: "Ici, la carte de la Tour t'invite à accueillir les bouleversements et les effondrements nécessaires dans ta vie. Elle t'encourage à ne pas résister aux changements soudains, car ils révèlent des vérités et mettent fin aux illusions. C'est un appel à voir la déconstruction comme une opportunité de reconstruction et de transformation. La Tour te rappelle que même dans le chaos, il y a une sagesse à découvrir, et que ces moments préparent le terrain pour rebâtir sur des bases plus solides et alignées avec qui tu es vraiment.",
        image: "16-la-maison-dieu.png"
    },
    {
        id: 17,
        name: "L'Étoile",
        type: "major",
        keywords: "Espoir – Guérison – Inspiration",
        description: "Ici, la carte de l'Étoile t'invite à faire preuve de foi et à suivre ta bonne étoile intérieure. Elle t'encourage à accueillir ta vulnérabilité comme une porte vers la guérison et la réconciliation avec toi-même. C'est un appel à avancer avec sérénité, à laisser l'inspiration te guider et à cultiver ta lumière intérieure. L'Étoile te rappelle que même dans l'incertitude, l'espoir devient une force qui éclaire ton chemin et te reconnecte à ton essence spirituelle.",
        image: "17-l-etoile.png"
    },
    {
        id: 18,
        name: "La Lune",
        type: "major",
        keywords: "Intuition – Mystères – Éveil",
        description: "Ici, la carte de la Lune t'invite à plonger dans les mystères de ton inconscient et à explorer les aspects inconnus de toi-même. Elle t'encourage à écouter et à exprimer tes émotions profondes, tout en suivant un chemin guidé par ton intuition. C'est un appel à te reconnecter à ta vérité intérieure, à accepter l'invisible et à rester réceptif(ve) aux messages subtils de ton monde intérieur, pour favoriser ton éveil personnel et spirituel.",
        image: "18-la-lune.png"
    },
    {
        id: 19,
        name: "Le Soleil",
        type: "major",
        keywords: "Joie – Succès – Clarté",
        description: "Ici, la carte du Soleil t'invite à rayonner pleinement et à savourer le moment présent. Elle t'encourage à exprimer ta vérité, à embrasser la joie et le bonheur simples, et à te reconnecter à ton enfant intérieur émerveillé. C'est un appel à ressentir de la gratitude pour ce qui est déjà là, à faire confiance à la vie et à partager ta lumière avec le monde en toute authenticité. Le Soleil te rappelle que la vitalité, la clarté et l'épanouissement sont à portée de main lorsque tu choisis de t'ouvrir à la magie du présent.",
        image: "19-le-soleil.png"
    },
    {
        id: 20,
        name: "Le Jugement",
        type: "major",
        keywords: "Renouveau – Pardon – Éveil",
        description: "Ici, la carte du Jugement t'invite à l'auto-évaluation et à l'introspection. Elle t'encourage à te libérer des poids du passé, à faire face aux vérités profondes et à embrasser un grand renouveau. C'est un appel à te réconcilier avec toi-même, à pardonner, à guérir et à te donner une seconde chance. Le Jugement te rappelle que cette transformation ouvre la voie à une nouvelle vision de ta vie et à un éveil intérieur significatif.",
        image: "20-le-jugement.png"
    },
    {
        id: 21,
        name: "Le Monde",
        type: "major",
        keywords: "Accomplissement – Épanouissement – Intégration",
        description: "Ici, la carte du Monde t'invite à reconnaître tes accomplissements et à célébrer ton parcours. Elle t'encourage à intégrer pleinement les leçons apprises et à te réconcilier avec ton environnement. C'est un appel à ressentir de la gratitude pour ce que tu as atteint et à t'ouvrir aux nouveaux cycles qui s'offrent à toi. Le Monde te rappelle que l'épanouissement, l'équilibre et la complétude sont à portée de main lorsque tu honores le chemin parcouru et embrasses les possibilités à venir.",
        image: "21-le-monde.png"
    }
];

// === FONCTION UTILITAIRE POUR LES IMAGES ===
// Construit le chemin complet vers l'image de la carte
// Utilise WebP optimisé par défaut avec fallback PNG
// @param {Object} card - Objet carte contenant la propriété 'image'
// @param {String} size - Taille souhaitée: '300w' ou '150w' (défaut: 300w)
// @return {Object} - URLs pour WebP et PNG fallback
function getImageUrl(card, size = '300w') {
    const baseName = card.image.replace('.png', '');
    return {
        webp: `./images/major/${baseName}-${size}.webp`,
        fallback: `./images/major/${card.image}`
    };
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
        // Crée l'élément image avec support WebP
        const img = document.createElement('img');
        const urls = getImageUrl(card, '300w');

        // Utilise WebP optimisé par défaut
        img.src = urls.webp;
        img.alt = card.name;  // Texte alternatif pour l'accessibilité
        img.className = 'card-image';
        img.loading = 'lazy'; // Chargement différé pour performance

        // Gestion d'erreur: essaie PNG si WebP échoue
        img.onerror = function() {
            if (this.src !== urls.fallback) {
                // Premier échec: essayer le PNG original
                this.src = urls.fallback;
            } else {
                // Si PNG échoue aussi, utiliser le fallback textuel
                const fallbackElement = createFallbackElement(card);
                img.parentElement.replaceChild(fallbackElement, img);
            }
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

    // Création sécurisée de l'élément (évite XSS)
    button.textContent = ''; // Efface le contenu existant
    const star = document.createElement('span');
    star.className = 'spinning-star';
    star.textContent = '✦';
    button.appendChild(star);

    // Délai de 1.5s pour l'effet de suspense
    setTimeout(() => {
        // Sélection aléatoire d'une carte
        const selectedCard = randomizer.getRandomCard();

        // === SAUVEGARDE DANS LOCALSTORAGE ===
        saveCardToHistory(selectedCard);

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

        // Affiche le bouton historique
        updateHistoryButton();
    }, 1500);
}

// === FONCTION DE FERMETURE DE LA MODAL ===
// Ferme la modal avec animations de sortie
// Retourne la carte à sa position initiale avant de cacher l'overlay
function closeCard() {
    const overlay = document.getElementById('cardOverlay');
    const cardFlip = document.getElementById('cardFlip');
    const infoPanel = document.getElementById('cardInfoPanel');

    // Cache le panneau d'information s'il est ouvert
    if (infoPanel) {
        infoPanel.classList.remove('active');
    }

    // Retourne d'abord la carte (animation inverse)
    cardFlip.classList.remove('flipped');

    // Attend la fin de l'animation avant de cacher l'overlay
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 300);
}

// === FONCTION D'AFFICHAGE DES INFORMATIONS ===
// Affiche/masque le panneau d'information de la carte
function toggleCardInfo() {
    const infoPanel = document.getElementById('cardInfoPanel');
    const savedDraw = getSavedDraw();

    if (savedDraw) {
        // Si le panneau est déjà actif, on le ferme
        if (infoPanel.classList.contains('active')) {
            infoPanel.classList.remove('active');
        } else {
            // Sinon on le remplit et on l'affiche
            // Remplir le contenu du panneau d'information de manière sécurisée
            const infoContent = document.getElementById('cardInfoContent');

            // Effacer le contenu précédent
            infoContent.textContent = '';

            // Créer les éléments DOM de manière sécurisée (évite XSS)
            const h3 = document.createElement('h3');
            h3.textContent = savedDraw.name;

            const keywordsDiv = document.createElement('div');
            keywordsDiv.className = 'keywords';
            keywordsDiv.textContent = savedDraw.keywords;

            const descriptionDiv = document.createElement('div');
            descriptionDiv.className = 'description';
            descriptionDiv.textContent = savedDraw.description || 'Description non disponible';

            // Ajouter les éléments au conteneur
            infoContent.appendChild(h3);
            infoContent.appendChild(keywordsDiv);
            infoContent.appendChild(descriptionDiv);

            // Afficher le panneau
            infoPanel.classList.add('active');
        }
    }
}

// === SYSTÈME DE SAUVEGARDE DES TIRAGES ===
// Sauvegarde la carte dans localStorage
function saveCardToHistory(card) {
    // Récupère la date et l'heure actuelles
    const now = new Date();
    const cardData = {
        ...card,
        drawnAt: now.toISOString(),
        timestamp: now.getTime()
    };

    // Sauvegarde dans localStorage (remplace le tirage précédent)
    localStorage.setItem('currentDraw', JSON.stringify(cardData));
}

// Récupère le tirage sauvegardé
function getSavedDraw() {
    const saved = localStorage.getItem('currentDraw');
    return saved ? JSON.parse(saved) : null;
}

// Met à jour la visibilité de la miniature
function updateHistoryButton() {
    const thumbnail = document.getElementById('savedCardThumbnail');
    const thumbnailImage = document.getElementById('thumbnailImage');
    const savedDraw = getSavedDraw();

    if (savedDraw && thumbnail && thumbnailImage) {
        // Met à jour l'image de la miniature avec WebP optimisé
        const urls = getImageUrl(savedDraw, '150w'); // Version plus petite pour miniature
        thumbnailImage.src = urls.webp;
        thumbnailImage.alt = savedDraw.name;
        thumbnailImage.loading = 'lazy';

        // Fallback vers PNG si WebP ne fonctionne pas
        thumbnailImage.onerror = function() {
            this.src = urls.fallback;
            this.onerror = null;
        };

        // Affiche la miniature
        thumbnail.classList.add('visible');
    } else if (thumbnail) {
        // Cache la miniature s'il n'y a pas de tirage
        thumbnail.classList.remove('visible');
    }
}

// Réaffiche la carte sauvegardée dans la modal principale
function showSavedCard() {
    const savedDraw = getSavedDraw();

    if (savedDraw) {
        const overlay = document.getElementById('cardOverlay');
        const cardFlip = document.getElementById('cardFlip');
        const cardFace = document.getElementById('cardFace');

        // Nettoyage sécurisé du contenu précédent
        while (cardFace.firstChild) {
            cardFace.removeChild(cardFace.firstChild);
        }

        // Ajout du contenu de la carte sauvegardée
        const cardContent = createCardContent(savedDraw);
        if (cardContent instanceof Node) {
            cardFace.appendChild(cardContent);
        }

        // Active la modal
        overlay.classList.add('active');

        // S'assure que la carte est déjà retournée
        setTimeout(() => {
            cardFlip.classList.add('flipped');
        }, 100);
    }
}

// Efface l'historique
function clearHistory() {
    localStorage.removeItem('currentDraw');
    updateHistoryButton(); // Met à jour la miniature
    document.getElementById('savedDrawsOverlay').classList.remove('active');

    // Cache le popup de confirmation
    const confirmPopup = document.getElementById('confirmPopup');
    if (confirmPopup) {
        confirmPopup.style.display = 'none';
    }
}

// Affiche la popup de confirmation
function showConfirmPopup() {
    const confirmPopup = document.getElementById('confirmPopup');
    if (confirmPopup) {
        confirmPopup.style.display = 'flex';
    }
}

// Cache la popup de confirmation
function hideConfirmPopup() {
    const confirmPopup = document.getElementById('confirmPopup');
    if (confirmPopup) {
        confirmPopup.style.display = 'none';
    }
}

// === INITIALISATION DE L'APPLICATION ===
// Point d'entrée principal - s'exécute quand le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Crée les particules d'ambiance
    createParticles();

    // Vérifie s'il y a un tirage sauvegardé au chargement
    updateHistoryButton();

    // === GESTIONNAIRES D'ÉVÉNEMENTS ===
    // Bouton de tirage de carte
    document.getElementById('drawButton').addEventListener('click', drawCard);

    // Nouveau bouton de fermeture en bas de la carte
    document.getElementById('closeButton').addEventListener('click', closeCard);

    // Bouton pour afficher les informations de la carte
    document.getElementById('infoButton').addEventListener('click', toggleCardInfo);

    // Bouton de fermeture du panneau d'information - utilise la délégation d'événements
    document.addEventListener('click', function(e) {
        // Si on clique sur le bouton de fermeture du panneau d'info
        if (e.target && e.target.id === 'cardInfoClose') {
            const panel = document.getElementById('cardInfoPanel');
            if (panel) {
                panel.classList.remove('active');
            }
        }
    });

    // Miniature de la carte sauvegardée - réouvre la même modal
    const savedThumbnail = document.getElementById('savedCardThumbnail');
    if (savedThumbnail) {
        savedThumbnail.addEventListener('click', function(e) {
            // Ne pas ouvrir la carte si on clique sur le bouton de suppression
            if (!e.target.classList.contains('delete-card-btn')) {
                showSavedCard();
            }
        });
    }

    // Bouton de suppression rapide de la carte
    const deleteBtn = document.getElementById('deleteCardBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêche le clic de propager vers la miniature

            // Affiche le popup de confirmation
            const confirmPopup = document.getElementById('confirmPopup');
            if (confirmPopup) {
                confirmPopup.style.display = 'flex';
            }
        });
    }

    // Bouton de fermeture des tirages sauvegardés (gardé au cas où)
    const savedDrawsClose = document.getElementById('savedDrawsClose');
    if (savedDrawsClose) {
        savedDrawsClose.addEventListener('click', () => {
            document.getElementById('savedDrawsOverlay').classList.remove('active');
        });
    }

    // Bouton pour effacer l'historique (gardé au cas où)
    const clearHistoryButton = document.getElementById('clearHistory');
    if (clearHistoryButton) {
        clearHistoryButton.addEventListener('click', showConfirmPopup);
    }

    // Boutons de la popup de confirmation
    const confirmYes = document.getElementById('confirmYes');
    if (confirmYes) {
        confirmYes.addEventListener('click', clearHistory);
    }

    const confirmNo = document.getElementById('confirmNo');
    if (confirmNo) {
        confirmNo.addEventListener('click', hideConfirmPopup);
    }

    // DÉSACTIVÉ: Fermeture en cliquant sur le fond pour éviter les fermetures accidentelles
    // L'utilisateur doit maintenant cliquer sur le bouton X pour fermer la carte
    /*
    document.getElementById('cardOverlay').addEventListener('click', (e) => {
        // Vérifie que le clic est sur l'overlay et non sur la carte
        if (e.target === e.currentTarget) {
            closeCard();
        }
    });
    */

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