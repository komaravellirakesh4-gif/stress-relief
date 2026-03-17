import https from 'https';

const urls = [
  "https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3",
  "https://assets.mixkit.co/active_storage/sfx/2408/2408-preview.mp3"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(url, 'Status:', res.statusCode);
  }).on('error', (e) => {
    console.error(url, 'Error:', e.message);
  });
});
