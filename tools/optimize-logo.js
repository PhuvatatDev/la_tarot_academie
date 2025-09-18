/**
 * Script d'optimisation du logo LA TAROT ACADÉMIE
 * Réduit la taille du fichier pour améliorer les performances mobiles
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const INPUT_LOGO = path.join(__dirname, '..', 'images', 'logo', 'logo_LaTarotAcademie.png');
const OUTPUT_DIR = path.join(__dirname, '..', 'images', 'logo');

async function optimizeLogo() {
    try {
        console.log('🎨 Optimisation du logo LA TAROT ACADÉMIE...\n');

        // Obtenir la taille originale
        const stats = await fs.stat(INPUT_LOGO);
        const originalSizeMB = (stats.size / 1024 / 1024).toFixed(2);
        console.log(`📊 Taille originale: ${originalSizeMB} MB`);

        // Créer une version PNG optimisée (pour compatibilité maximale)
        const optimizedPngPath = path.join(OUTPUT_DIR, 'logo_LaTarotAcademie_optimized.png');
        await sharp(INPUT_LOGO)
            .resize(300, 300, { // Taille raisonnable pour un logo
                fit: 'inside',
                withoutEnlargement: true
            })
            .png({
                quality: 100,
                compressionLevel: 9, // Compression maximale
                palette: true // Réduction des couleurs si possible
            })
            .toFile(optimizedPngPath);

        // Créer une version WebP pour les navigateurs modernes
        const webpPath = path.join(OUTPUT_DIR, 'logo_LaTarotAcademie.webp');
        await sharp(INPUT_LOGO)
            .resize(300, 300, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({
                quality: 90,
                effort: 6
            })
            .toFile(webpPath);

        // Créer une version mobile plus petite
        const mobilePngPath = path.join(OUTPUT_DIR, 'logo_LaTarotAcademie_mobile.png');
        await sharp(INPUT_LOGO)
            .resize(150, 150, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .png({
                quality: 100,
                compressionLevel: 9
            })
            .toFile(mobilePngPath);

        // Obtenir les nouvelles tailles
        const optimizedStats = await fs.stat(optimizedPngPath);
        const webpStats = await fs.stat(webpPath);
        const mobileStats = await fs.stat(mobilePngPath);

        console.log('\n✅ Fichiers créés:');
        console.log(`   PNG optimisé: ${(optimizedStats.size / 1024).toFixed(1)} KB`);
        console.log(`   WebP: ${(webpStats.size / 1024).toFixed(1)} KB`);
        console.log(`   Mobile PNG: ${(mobileStats.size / 1024).toFixed(1)} KB`);

        const reduction = ((1 - optimizedStats.size / stats.size) * 100).toFixed(1);
        console.log(`\n🎯 Réduction: ${reduction}% 🚀`);

        // Renommer l'ancien fichier
        const backupPath = path.join(OUTPUT_DIR, 'logo_LaTarotAcademie_original.png');
        await fs.rename(INPUT_LOGO, backupPath);
        console.log(`\n📦 Fichier original sauvegardé comme: logo_LaTarotAcademie_original.png`);

        // Renommer la version optimisée
        await fs.rename(optimizedPngPath, INPUT_LOGO);
        console.log(`✅ Logo optimisé remplace l'original`);

    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

// Lancer l'optimisation
console.log('='.repeat(50));
console.log('🌟 LA TAROT ACADÉMIE - Optimisation du Logo 🌟');
console.log('='.repeat(50));

optimizeLogo().catch(console.error);