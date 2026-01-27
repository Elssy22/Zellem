const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const PB_URL = 'http://127.0.0.1:8090';
const PUBLIC_DIR = path.join(__dirname, '../public/images');

async function importMedia() {
  console.log('Début de l\'import des médias...\n');

  // Liste des fichiers à importer
  const filesToImport = [];

  // Images principales
  const mainImages = [
    'Art-We-Trust.jpeg',
    'Début.jpeg',
    'LOGO.png',
    'Renaissance.jpeg',
    'Zellem.jpeg',
    'zellem-canvas.jpg',
    'zellem-drawing.jpg',
    'zellem-portrait.jpg',
    'zellem-profile.jpg',
    'zellem-studio.jpg'
  ];

  for (const file of mainImages) {
    const filePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(filePath)) {
      filesToImport.push({
        path: filePath,
        name: path.parse(file).name,
        tags: ['site', 'zellem']
      });
    }
  }

  // Images artworks
  const artworksDir = path.join(PUBLIC_DIR, 'artworks');
  if (fs.existsSync(artworksDir)) {
    const artworkFiles = fs.readdirSync(artworksDir);
    for (const file of artworkFiles) {
      const filePath = path.join(artworksDir, file);
      if (fs.statSync(filePath).isFile()) {
        filesToImport.push({
          path: filePath,
          name: path.parse(file).name,
          tags: ['artwork', 'oeuvre', 'zellem']
        });
      }
    }
  }

  console.log(`${filesToImport.length} fichiers trouvés.\n`);

  // Import via fetch
  for (const file of filesToImport) {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(file.path));
      formData.append('name', file.name);
      formData.append('type', file.path.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image');
      formData.append('tags', JSON.stringify(file.tags));
      formData.append('alt_text', file.name);

      const response = await fetch(`${PB_URL}/api/collections/media/records`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log(`✓ ${file.name}`);
      } else {
        const error = await response.json();
        console.log(`✗ ${file.name}: ${error.message || 'Erreur'}`);
      }
    } catch (error) {
      console.log(`✗ ${file.name}: ${error.message}`);
    }
  }

  console.log('\nImport terminé!');
}

importMedia();
