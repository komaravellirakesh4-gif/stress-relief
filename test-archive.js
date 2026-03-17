import https from 'https';

const urls = [
  "https://archive.org/download/aporee_16454_19478/birds.mp3",
  "https://archive.org/download/BirdSongs/BirdSongs.mp3",
  "https://archive.org/download/morning-birds-singing/morning-birds-singing.mp3",
  "https://archive.org/download/NatureSounds_201809/Bird%20Sounds.mp3"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(url, '->', res.statusCode);
  }).on('error', (e) => {
    console.error(url, '->', e.message);
  });
});
