import https from 'https';

const urls = [
  "https://assets.mixkit.co/active_storage/sfx/2391/2391-preview.mp3",
  "https://assets.mixkit.co/active_storage/sfx/2408/2408-preview.mp3",
  "https://cdn.freesound.org/previews/416/416529_5121236-lq.mp3",
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/Radio_Macaw.ogg"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(url, '->', res.statusCode);
  }).on('error', (e) => {
    console.error(url, '->', e.message);
  });
});
