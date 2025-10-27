const sharp = require('sharp');
const path = require('path');

async function generate() {
    const input = path.resolve('images/major/02-la-papesse.png');

    console.log('🔄 Génération des WebP pour carte 02...\n');

    // 300w
    await sharp(input)
        .resize(300, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 85, effort: 6 })
        .toFile('images/major/02-la-papesse-300w.webp');
    console.log('✅ 02-la-papesse-300w.webp créé');

    // 150w
    await sharp(input)
        .resize(150, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 85, effort: 6 })
        .toFile('images/major/02-la-papesse-150w.webp');
    console.log('✅ 02-la-papesse-150w.webp créé');

    console.log('\n✨ Terminé ! Rafraîchis ta page de test.');
}

generate().catch(console.error);
