/**
 * Script pour convertir la nouvelle image de La Grande-Prêtresse
 * Remplace l'ancienne carte 02 par la nouvelle
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_FILE = path.join(__dirname, '..', 'images', 'major', '2. la grande-prêtresse.png').replace(/\\/g, '/');
const OUTPUT_DIR = path.join(__dirname, '..', 'images', 'major').replace(/\\/g, '/');
const OUTPUT_BASE = '02-la-papesse';

async function convertCard() {
    try {
        console.log('🎴 Conversion de la carte La Grande-Prêtresse (02)...\n');

        // Vérifier que le fichier source existe
        try {
            await fs.access(INPUT_FILE);
            console.log('✅ Fichier source trouvé:', INPUT_FILE);
        } catch (err) {
            console.error('❌ Fichier source introuvable:', INPUT_FILE);
            process.exit(1);
        }

        // Backup des anciens fichiers
        console.log('\n📦 Sauvegarde des anciens fichiers...');
        const backupDir = path.join(__dirname, '..', 'images', 'major', 'backup');

        try {
            await fs.mkdir(backupDir, { recursive: true });

            const oldFiles = [
                `${OUTPUT_BASE}.png`,
                `${OUTPUT_BASE}-150w.webp`,
                `${OUTPUT_BASE}-300w.webp`
            ];

            for (const file of oldFiles) {
                const oldPath = path.join(OUTPUT_DIR, file);
                const backupPath = path.join(backupDir, `old-${file}`);
                try {
                    await fs.copyFile(oldPath, backupPath);
                    console.log(`   ✅ Backup: ${file}`);
                } catch (err) {
                    console.log(`   ⚠️  Fichier non trouvé: ${file}`);
                }
            }
        } catch (err) {
            console.log('   ⚠️  Impossible de créer le backup');
        }

        // Copier le nouveau PNG
        console.log('\n🖼️  Copie du nouveau fichier PNG...');
        const newPngPath = path.join(OUTPUT_DIR, `${OUTPUT_BASE}.png`);
        await fs.copyFile(INPUT_FILE, newPngPath);
        const pngStats = await fs.stat(newPngPath);
        console.log(`   ✅ ${OUTPUT_BASE}.png créé (${(pngStats.size / 1024 / 1024).toFixed(2)} MB)`);

        // Créer les versions WebP
        console.log('\n🔄 Génération des versions WebP optimisées...');

        // Version 300w (desktop)
        const output300 = path.join(OUTPUT_DIR, `${OUTPUT_BASE}-300w.webp`);
        await sharp(newPngPath)
            .resize(300, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({
                quality: 85,
                effort: 6
            })
            .toFile(output300);

        const stats300 = await fs.stat(output300);
        console.log(`   ✅ ${OUTPUT_BASE}-300w.webp: ${(stats300.size / 1024).toFixed(1)} KB`);

        // Version 150w (mobile)
        const output150 = path.join(OUTPUT_DIR, `${OUTPUT_BASE}-150w.webp`);
        await sharp(newPngPath)
            .resize(150, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({
                quality: 85,
                effort: 6
            })
            .toFile(output150);

        const stats150 = await fs.stat(output150);
        console.log(`   ✅ ${OUTPUT_BASE}-150w.webp: ${(stats150.size / 1024).toFixed(1)} KB`);

        // Résumé
        console.log('\n' + '='.repeat(50));
        console.log('✨ CONVERSION TERMINÉE AVEC SUCCÈS !');
        console.log('='.repeat(50));
        console.log('\n📋 Fichiers créés:');
        console.log(`   • ${OUTPUT_BASE}.png (${(pngStats.size / 1024 / 1024).toFixed(2)} MB)`);
        console.log(`   • ${OUTPUT_BASE}-300w.webp (${(stats300.size / 1024).toFixed(1)} KB)`);
        console.log(`   • ${OUTPUT_BASE}-150w.webp (${(stats150.size / 1024).toFixed(1)} KB)`);

        const totalSize = pngStats.size + stats300.size + stats150.size;
        const webpSize = stats300.size + stats150.size;
        const reduction = ((1 - webpSize / pngStats.size) * 100).toFixed(1);

        console.log(`\n📊 Réduction WebP: ${reduction}%`);
        console.log('\n🔄 Rafraîchis la page de test pour voir la nouvelle carte !');

    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

console.log('='.repeat(50));
console.log('🌟 Conversion Carte 02 - La Grande-Prêtresse 🌟');
console.log('='.repeat(50));

convertCard().catch(console.error);
