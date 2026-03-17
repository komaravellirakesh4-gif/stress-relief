import https from 'https';

const urls = [
  "https://assets.mixkit.co/active_storage/sfx/2391/2391-preview.mp3",
  "https://assets.mixkit.co/active_storage/sfx/2408/2408-preview.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(url, 'Status:', res.statusCode);
  }).on('error', (e) => {
    console.error(url, 'Error:', e.message);
  });
});
