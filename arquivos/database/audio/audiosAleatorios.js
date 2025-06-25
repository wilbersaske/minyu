// audiosAleatorios.js
const axios = require('axios');

// Lista de links dos áudios
const audioUrls = [
  'https://files.catbox.moe/f4i7mi.mp3',
  'https://files.catbox.moe/v6xn20.mp3'
];

// Escolhe um link aleatório
function escolherLinkAleatorio() {
  const aleatorio = Math.floor(Math.random() * audioUrls.length);
  return audioUrls[aleatorio];
}

// Retorna um buffer do áudio diretamente do link
async function pegarAudioAleatorioBuffer() {
  try {
    const url = escolherLinkAleatorio();
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
  } catch (err) {
    console.error("❌ Erro ao baixar áudio aleatório:", err);
    return null;
  }
}

module.exports = {
  pegarAudioAleatorioBuffer
};