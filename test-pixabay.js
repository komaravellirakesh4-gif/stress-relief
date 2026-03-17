import https from 'https';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};

const urls = [
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3",
  "https://cdn.pixabay.com/download/audio/2021/09/06/audio_37b301b173.mp3"
];

urls.forEach(url => {
  https.get(url, options, (res) => {
    console.log(url, '->', res.statusCode);
  }).on('error', (e) => {
    console.error(url, '->', e.message);
  });
});
