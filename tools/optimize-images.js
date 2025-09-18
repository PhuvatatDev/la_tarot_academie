/**
 * Script d'optimisation des images de tarot
 * Convertit les PNG en WebP avec différentes tailles
 * Garde les originaux intacts pour fallback
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const INPUT_DIR = path.join(__dirname, '..', 'images', 'major');
const OUTPUT_DIR = INPUT_DIR; // On met les WebP dans le même dossier

// Tailles à générer
const SIZES = [
    { width: 300, suffix: '-300w' },
    { width: 150, suffix: '-150w' }
];

// Qualité WebP (85 = excellent compromis qualité/taille)
const WEBP_QUALITY = 85;

async function optimizeImages() {
    try {
        console.log('🎨 Début de l\'optimisation des images...\n');

        // Lire tous les fichiers PNG
        const files = await fs.readdir(INPUT_DIR);
        const pngFiles = files.filter(file => file.endsWith('.png'));

        console.log(`📊 ${pngFiles.length} images PNG trouvées\n`);

        let totalOriginalSize = 0;
        let totalOptimizedSize = 0;

        // Traiter chaque image
        for (const file of pngFiles) {
            const inputPath = path.join(INPUT_DIR, file);
            const basename = path.basename(file, '.png');

            // Obtenir la taille originale
            const stats = await fs.stat(inputPath);
            const originalSizeMB = (stats.size / 1024 / 1024).toFixed(2);
            totalOriginalSize += stats.size;

            console.log(`\n📸 Traitement de: ${file}`);
            console.log(`   Taille originale: ${originalSizeMB} MB`);

            // Créer les versions WebP pour chaque taille
            for (const size of SIZES) {
                const outputFile = `${basename}${size.suffix}.webp`;
                const outputPath = path.join(OUTPUT_DIR, outputFile);

                try {
                    // Convertir et redimensionner
                    await sharp(inputPath)
                        .resize(size.width, null, {
                            withoutEnlargement: true,
                            fit: 'inside'
                        })
                        .webp({
                            quality: WEBP_QUALITY,
                            effort: 6 // Compression maximale (0-6)
                        })
                        .toFile(outputPath);

                    // Obtenir la taille du fichier créé
                    const newStats = await fs.stat(outputPath);
                    const newSizeKB = (newStats.size / 1024).toFixed(1);
                    totalOptimizedSize += newStats.size;

                    console.log(`   ✅ ${outputFile}: ${newSizeKB} KB`);

                } catch (err) {
                    console.error(`   ❌ Erreur pour ${outputFile}:`, err.message);
                }
            }
        }

        // Résumé final
        console.log('\n' + '='.repeat(50));
        console.log('📊 RÉSUMÉ DE L\'OPTIMISATION');
        console.log('='.repeat(50));

        const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(1);
        const totalOptimizedMB = (totalOptimizedSize / 1024 / 1024).toFixed(1);
        const reduction = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);

        console.log(`\n📦 Taille totale originale: ${totalOriginalMB} MB`);
        console.log(`📦 Taille totale optimisée: ${totalOptimizedMB} MB`);
        console.log(`🎯 Réduction: ${reduction}% 🚀`);
        console.log(`\n✨ Optimisation terminée avec succès!`);

    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

// Lancer l'optimisation
console.log('='.repeat(50));
console.log('🌟 LA TAROT ACADÉMIE - Optimisation des Images 🌟');
console.log('='.repeat(50));

optimizeImages().catch(console.error);