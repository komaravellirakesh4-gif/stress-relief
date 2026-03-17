import https from 'https';

https.get('https://cdn.pixabay.com/audio/2021/09/06/audio_37b301b173.mp3', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers['content-type']);
});
