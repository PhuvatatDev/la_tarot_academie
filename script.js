// LA Tarot Académie - JavaScript
// Générateur de tirage : 22 Arcanes Majeurs, tirés à l'endroit OU à l'envers.
// Les données (mots-clés + significations endroit/envers) sont dans cards-data.js (const MAJOR_ARCANA).

// === CONFIGURATION GITHUB PAGES ===
const GITHUB_USERNAME = 'PhuvatatDev';
const REPO_NAME = 'la_tarot_academie';
const BRANCH = 'main';

// === ACCÈS AUX DONNÉES ===
// Retrouve une carte par son id dans MAJOR_ARCANA
function getCardById(id) {
    return MAJOR_ARCANA.find(c => c.id === id) || null;
}

// Libellé lisible d'une orientation
function orientationLabel(orientation) {
    return orientation === 'reversed' ? "À l'envers" : "À l'endroit";
}

// === SYSTÈME DE RANDOMISATION AVANCÉ ===
// crypto.getRandomValues + mouvements de souris + timestamp
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

    // Tire une carte ET son orientation (endroit/envers ~ 50/50)
    // @return {Object} - { card, orientation }
    getRandomDraw() {
        const cryptoArray = new Uint32Array(2);
        crypto.getRandomValues(cryptoArray);

        const timestamp = Date.now();
        const mouseInfluence = this.entropy || Math.random() * 1000;

        // Index de la carte
        const combined = (cryptoArray[0] + timestamp + mouseInfluence) % MAJOR_ARCANA.length;
        const card = MAJOR_ARCANA[Math.floor(combined)];

        // Orientation : bit indépendant tiré du crypto
        const orientation = (cryptoArray[1] % 2 === 0) ? 'upright' : 'reversed';

        return { card, orientation };
    }
}

const randomizer = new UltraRandomizer();

// === SYSTÈME DE PARTICULES ANIMÉES ===
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
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

// === CRÉATION DU CONTENU DE LA CARTE ===
// Affiche l'image de la carte ; la classe 'reversed' la retourne à 180° (position envers)
// @param {Object} card - carte de MAJOR_ARCANA
// @param {String} orientation - 'upright' | 'reversed'
function createCardContent(card, orientation) {
    if (card && card.image) {
        const img = document.createElement('img');
        img.src = card.image;
        img.alt = card.name + (orientation === 'reversed' ? ' (renversée)' : '');
        img.className = 'card-image' + (orientation === 'reversed' ? ' reversed' : '');
        img.loading = 'lazy';

        // Si l'image ne charge pas, bascule sur un placeholder textuel
        img.onerror = function() {
            const fallbackElement = createFallbackElement(card, orientation);
            if (img.parentElement) {
                img.parentElement.replaceChild(fallbackElement, img);
            }
        };
        return img;
    }
    return createFallbackElement(card, orientation);
}

// === PLACEHOLDER DE SECOURS ===
function createFallbackElement(card, orientation) {
    const placeholder = document.createElement('div');
    placeholder.className = 'card-image-placeholder';
    if (orientation === 'reversed') placeholder.classList.add('reversed');

    const numberSpan = document.createElement('span');
    numberSpan.className = 'card-number';
    numberSpan.textContent = card.number;
    placeholder.appendChild(numberSpan);

    const symbolDiv = document.createElement('div');
    symbolDiv.className = 'card-symbol';
    symbolDiv.textContent = '✦';
    placeholder.appendChild(symbolDiv);

    const nameDiv = document.createElement('div');
    nameDiv.className = 'card-name';
    nameDiv.textContent = card.name;
    placeholder.appendChild(nameDiv);

    const keywordsDiv = document.createElement('div');
    keywordsDiv.className = 'card-keywords';
    keywordsDiv.textContent = card[orientation].keywords.join(' · ');
    placeholder.appendChild(keywordsDiv);

    return placeholder;
}

// === FONCTION PRINCIPALE DE TIRAGE ===
function drawCard() {
    const button = document.getElementById('drawButton');
    const overlay = document.getElementById('cardOverlay');
    const cardFlip = document.getElementById('cardFlip');
    const cardFace = document.getElementById('cardFace');

    // Animation de mélange (étoile qui tourne) — on préserve le markup perle :
    // le label est masqué via .shuffling (CSS) et l'étoile est insérée dans le wrap.
    button.classList.add('shuffling');
    const pearlWrap = button.querySelector('.pearl-wrap') || button;
    const star = document.createElement('span');
    star.className = 'spinning-star';
    star.textContent = '✦';
    pearlWrap.appendChild(star);

    setTimeout(() => {
        // Tirage carte + orientation
        const { card, orientation } = randomizer.getRandomDraw();

        // Sauvegarde du tirage courant
        saveDraw(card, orientation);

        // Nettoyage du contenu précédent
        while (cardFace.firstChild) {
            cardFace.removeChild(cardFace.firstChild);
        }

        // Affichage de la carte (retournée si envers)
        const cardContent = createCardContent(card, orientation);
        if (cardContent instanceof Node) {
            cardFace.appendChild(cardContent);
        }

        // Remplit la colonne d'info (signification + mots-clés) à côté de la carte
        renderCardInfo(card, orientation);

        // Active l'affichage de la carte
        overlay.classList.add('active');

        // Réinitialise les styles inline avant l'animation de flip
        cardFlip.style.transform = '';
        cardFlip.style.transition = '';

        setTimeout(() => {
            cardFlip.classList.add('flipped');
        }, 100);

        // Réinitialise le bouton : retire l'étoile, le label perle réapparaît (CSS)
        button.classList.remove('shuffling');
        star.remove();

        // Le bouton de tirage disparaît pour laisser place à la carte
        button.style.display = 'none';

        // Focus : centre la carte à l'écran, pas besoin de scroller pour la trouver
        overlay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
}

// === FERMETURE / RECOMMENCER ===
// Masque la carte et réaffiche le bouton de tirage (retour à l'état initial)
function closeCard() {
    const overlay = document.getElementById('cardOverlay');
    const cardFlip = document.getElementById('cardFlip');
    const drawButton = document.getElementById('drawButton');

    cardFlip.style.transform = '';
    cardFlip.style.transition = '';
    cardFlip.classList.remove('flipped');

    setTimeout(() => {
        overlay.classList.remove('active');
    }, 300);

    // Réaffiche le bouton de tirage pour recommencer
    if (drawButton) drawButton.style.display = '';
}

// === COLONNE D'INFORMATION (signification + mots-clés, à côté de la carte) ===
// Remplit #cardInfoInline avec le nom, l'orientation, les mots-clés et la signification.
function renderCardInfo(card, orientation) {
    const box = document.getElementById('cardInfoInline');
    if (!box || !card) return;

    const data = card[orientation] || card.upright;
    box.textContent = '';

    // Titre : nom de la carte
    const h3 = document.createElement('h3');
    h3.textContent = card.name;

    // Orientation (À l'endroit / À l'envers)
    const orientationDiv = document.createElement('div');
    orientationDiv.className = 'card-orientation';
    orientationDiv.textContent = orientationLabel(orientation);

    // Bloc mots-clés
    const kwLabel = document.createElement('div');
    kwLabel.className = 'info-label';
    kwLabel.textContent = 'Mots-clés';
    const keywordsDiv = document.createElement('div');
    keywordsDiv.className = 'keywords';
    keywordsDiv.textContent = data.keywords.join(' · ');

    // Bloc signification
    const meaningLabel = document.createElement('div');
    meaningLabel.className = 'info-label';
    meaningLabel.textContent = 'Signification';
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'description';
    descriptionDiv.textContent = data.meaning;

    box.appendChild(h3);
    box.appendChild(orientationDiv);
    box.appendChild(kwLabel);
    box.appendChild(keywordsDiv);
    box.appendChild(meaningLabel);
    box.appendChild(descriptionDiv);
}

// === SAUVEGARDE DU TIRAGE (localStorage) ===
// On ne stocke que l'id + l'orientation : les données sont relues depuis MAJOR_ARCANA
function saveDraw(card, orientation) {
    const now = new Date();
    const drawData = {
        id: card.id,
        orientation: orientation,
        drawnAt: now.toISOString(),
        timestamp: now.getTime()
    };
    localStorage.setItem('currentDraw', JSON.stringify(drawData));
}

function getSavedDraw() {
    const saved = localStorage.getItem('currentDraw');
    return saved ? JSON.parse(saved) : null;
}

// === MINIATURE DE LA CARTE SAUVEGARDÉE ===
function updateHistoryButton() {
    const thumbnail = document.getElementById('savedCardThumbnail');
    const thumbnailImage = document.getElementById('thumbnailImage');
    const savedDraw = getSavedDraw();

    if (savedDraw && thumbnail && thumbnailImage) {
        const card = getCardById(savedDraw.id);
        if (!card) {
            thumbnail.classList.remove('visible');
            return;
        }
        thumbnailImage.src = card.image;
        thumbnailImage.alt = card.name;
        thumbnailImage.loading = 'lazy';
        // Retourne la miniature si le tirage est à l'envers
        thumbnailImage.className = (savedDraw.orientation === 'reversed') ? 'reversed' : '';
        thumbnail.classList.add('visible');
    } else if (thumbnail) {
        thumbnail.classList.remove('visible');
    }
}

// === RÉAFFICHAGE DE LA CARTE SAUVEGARDÉE ===
function showSavedCard() {
    const savedDraw = getSavedDraw();
    if (!savedDraw) return;

    const card = getCardById(savedDraw.id);
    if (!card) return;
    const orientation = savedDraw.orientation || 'upright';

    const overlay = document.getElementById('cardOverlay');
    const cardFlip = document.getElementById('cardFlip');
    const cardFace = document.getElementById('cardFace');

    while (cardFace.firstChild) {
        cardFace.removeChild(cardFace.firstChild);
    }

    const cardContent = createCardContent(card, orientation);
    if (cardContent instanceof Node) {
        cardFace.appendChild(cardContent);
    }

    renderCardInfo(card, orientation);
    const drawButton = document.getElementById('drawButton');
    if (drawButton) drawButton.style.display = 'none';

    overlay.classList.add('active');

    setTimeout(() => {
        cardFlip.classList.add('flipped');
    }, 100);

    overlay.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// === EFFACEMENT DU TIRAGE ===
function clearHistory() {
    localStorage.removeItem('currentDraw');
    updateHistoryButton();
    document.getElementById('savedDrawsOverlay').classList.remove('active');
    const confirmPopup = document.getElementById('confirmPopup');
    if (confirmPopup) {
        confirmPopup.style.display = 'none';
    }
}

function showConfirmPopup() {
    const confirmPopup = document.getElementById('confirmPopup');
    if (confirmPopup) confirmPopup.style.display = 'flex';
}

function hideConfirmPopup() {
    const confirmPopup = document.getElementById('confirmPopup');
    if (confirmPopup) confirmPopup.style.display = 'none';
}

// === EFFET 3D TILT AU SURVOL (Desktop + Mobile) ===
function initCardTilt() {
    const cardFlip = document.getElementById('cardFlip');
    const cardContainer = document.querySelector('.card-container');
    if (!cardFlip || !cardContainer) return;

    const tiltIntensity = 30;

    function applyTilt(clientX, clientY) {
        if (!cardFlip.classList.contains('flipped')) return;
        const rect = cardContainer.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;
        const centerX = x - 0.5;
        const centerY = y - 0.5;
        const rotateY = centerX * tiltIntensity;
        const rotateX = -centerY * tiltIntensity;
        cardFlip.style.transform = `
            rotateY(${180 + rotateY}deg)
            rotateX(${rotateX}deg)
            scale(1.02)
        `;
        cardFlip.style.transition = 'transform 0.1s ease-out';
    }

    function resetTilt() {
        if (!cardFlip.classList.contains('flipped')) return;
        cardFlip.style.transform = 'rotateY(180deg)';
        cardFlip.style.transition = 'transform 0.3s ease';
    }

    cardContainer.addEventListener('mousemove', (e) => applyTilt(e.clientX, e.clientY));
    cardContainer.addEventListener('mouseleave', resetTilt);
    cardContainer.addEventListener('touchmove', function(e) {
        e.preventDefault();
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            applyTilt(touch.clientX, touch.clientY);
        }
    });
    cardContainer.addEventListener('touchend', resetTilt);
}

// === EFFET 3D TILT MAGNÉTIQUE POUR LE BOUTON ===
function initButtonTilt() {
    const button = document.getElementById('drawButton');
    if (!button) return;

    const magneticRange = 600;
    const magneticIntensity = 6;
    const hoverIntensity = 15;
    let isHovering = false;

    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    function applyEffect(clientX, clientY) {
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        const distance = getDistance(clientX, clientY, buttonCenterX, buttonCenterY);

        if (isHovering) {
            const x = (clientX - rect.left) / rect.width;
            const y = (clientY - rect.top) / rect.height;
            const centerX = x - 0.5;
            const centerY = y - 0.5;
            const rotateY = centerX * hoverIntensity;
            const rotateX = -centerY * hoverIntensity;
            button.style.transform = `
                perspective(1000px)
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
                translateY(-3px)
                scale(1.05)
            `;
            button.style.transition = 'transform 0.1s ease-out';
        } else if (distance < magneticRange) {
            const angleX = (clientX - buttonCenterX) / rect.width;
            const angleY = (clientY - buttonCenterY) / rect.height;
            const distanceFactor = 1 - (distance / magneticRange);
            const intensity = magneticIntensity * distanceFactor;
            const rotateY = angleX * intensity;
            const rotateX = -angleY * intensity;
            button.style.transform = `
                perspective(1000px)
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
                scale(1.01)
            `;
            button.style.transition = 'transform 0.2s ease-out';
        } else {
            button.style.transform = '';
            button.style.transition = 'transform 0.4s ease';
        }
    }

    function resetTilt() {
        isHovering = false;
        button.style.transform = '';
        button.style.transition = 'transform 0.3s ease';
    }

    document.addEventListener('mousemove', (e) => applyEffect(e.clientX, e.clientY));
    button.addEventListener('mouseenter', () => { isHovering = true; });
    button.addEventListener('mouseleave', () => { isHovering = false; });
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = button.getBoundingClientRect();
            const isOnButton = (
                touch.clientX >= rect.left &&
                touch.clientX <= rect.right &&
                touch.clientY >= rect.top &&
                touch.clientY <= rect.bottom
            );
            isHovering = isOnButton;
            applyEffect(touch.clientX, touch.clientY);
        }
    }, { passive: true });
    document.addEventListener('touchend', resetTilt);
}

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', function() {
    // Particules retirées (demande user). createParticles();
    updateHistoryButton();
    initCardTilt();
    // Tilt 3D du bouton désactivé : c'est désormais un "pearl button" (son transform
    // inline écraserait le press/hover du style perle). initButtonTilt();

    document.getElementById('drawButton').addEventListener('click', drawCard);
    document.getElementById('closeButton').addEventListener('click', closeCard);

    // Miniature : rouvre la carte
    const savedThumbnail = document.getElementById('savedCardThumbnail');
    if (savedThumbnail) {
        savedThumbnail.addEventListener('click', function(e) {
            if (!e.target.classList.contains('delete-card-btn')) {
                showSavedCard();
            }
        });
    }

    // Suppression rapide
    const deleteBtn = document.getElementById('deleteCardBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const confirmPopup = document.getElementById('confirmPopup');
            if (confirmPopup) confirmPopup.style.display = 'flex';
        });
    }

    const savedDrawsClose = document.getElementById('savedDrawsClose');
    if (savedDrawsClose) {
        savedDrawsClose.addEventListener('click', () => {
            document.getElementById('savedDrawsOverlay').classList.remove('active');
        });
    }

    const clearHistoryButton = document.getElementById('clearHistory');
    if (clearHistoryButton) {
        clearHistoryButton.addEventListener('click', showConfirmPopup);
    }

    const confirmYes = document.getElementById('confirmYes');
    if (confirmYes) confirmYes.addEventListener('click', clearHistory);

    const confirmNo = document.getElementById('confirmNo');
    if (confirmNo) confirmNo.addEventListener('click', hideConfirmPopup);
});
