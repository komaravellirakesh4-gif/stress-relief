import https from 'https';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};

const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/Radio_Macaw.ogg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4c/Chaffinch_singing.ogg",
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Nightingale_song.ogg",
  "https://upload.wikimedia.org/wikipedia/commons/5/5b/Bird_song_in_the_morning.ogg"
];

urls.forEach(url => {
  https.get(url, options, (res) => {
    console.log(url, '->', res.statusCode);
  }).on('error', (e) => {
    console.error(url, '->', e.message);
  });
});
