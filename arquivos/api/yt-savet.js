const axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process'); // Para rodar o FFmpeg

class YTSavet {
    constructor() {
        this.formatVideo = ['360', '480', '720', '1080', '1440', '2160'];
        this.downloadFolder = path.join(__dirname, 'downloads');

        if (!fs.existsSync(this.downloadFolder)) {
            fs.mkdirSync(this.downloadFolder, { recursive: true });
        }
    }

    async extractID(query) {
        const urlRegex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = query.match(urlRegex);
        return match ? `https://www.youtube.com/watch?v=${match[1]}` : query;
    }

    async cekProgress(id) {
        const checkProgress = async () => {
            try {
                const response = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`);
                if (response.data?.success && response.data?.progress === 1000) {
                    return response.data.download_url;
                }
                await new Promise(resolve => setTimeout(resolve, 5000));
                return checkProgress();
            } catch (error) {
                throw error;
            }
        };
        return checkProgress();
    }

    async downConfig(url, format) {
        return new Promise(async (resolve, reject) => {
            if (!this.formatVideo.includes(format)) {
                return reject('Formato não disponível.');
            }
            try {
                const { data } = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=cac6b51ad6d7788b5d14e4a0c6d9b004035f8ce4`);
                if (data?.success) {
                    const downloadUrl = await this.cekProgress(data.id);
                    resolve({
                        dl_link: downloadUrl,
                        title: data.title
                    });
                } else {
                    reject("Erro ao processar download.");
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async downloadVideo(query, format = '720') {
        return new Promise(async (resolve, reject) => {
            try {
                query = await this.extractID(query);
                const down = await this.downConfig(query, format);

                const filePath = path.join(this.downloadFolder, 'video.mp4');

                const response = await fetch(down.dl_link);
                const fileStream = fs.createWriteStream(filePath);
                response.body.pipe(fileStream);

                fileStream.on('finish', async () => {
                    if (!fs.existsSync(filePath)) {
                        return reject("Erro: O arquivo baixado não foi encontrado.");
                    }
                    resolve({ filePath });

                    setTimeout(() => this.clearDownloads(), 60000);
                });

                fileStream.on('error', (error) => {
                    reject("Erro ao salvar o arquivo: " + error.message);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    async convertVideo(inputPath, outputFormat = 'mp4') {
        return new Promise((resolve, reject) => {
            const outputPath = path.join(this.downloadFolder, `video_converted.${outputFormat}`);
            const command = `ffmpeg -i "${inputPath}" -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k "${outputPath}"`;

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error("Erro na conversão:", stderr);
                    return reject("Erro na conversão: " + stderr);
                }
                if (!fs.existsSync(outputPath)) {
                    return reject("Erro: O arquivo convertido não foi encontrado.");
                }
                resolve(outputPath);

                setTimeout(() => this.clearDownloads(), 60000);
            });
        });
    }

    async sendAndDelete(filePath, sendFunction) {
        try {
            if (!fs.existsSync(filePath)) {
                console.error("Erro: O arquivo que tentou enviar/apagar não existe:", filePath);
                return;
            }
            
            await sendFunction(filePath);
            fs.unlinkSync(filePath);
        } catch (error) {
            console.error("Erro ao enviar/apagar o arquivo:", error);
        }
    }

    clearDownloads() {
        try {
            if (!fs.existsSync(this.downloadFolder)) return;
            
            const files = fs.readdirSync(this.downloadFolder);
            files.forEach(file => {
                const filePath = path.join(this.downloadFolder, file);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            });
        } catch (error) {
            console.error('Erro ao limpar a pasta de downloads:', error);
        }
    }
}

// Exportar a classe
module.exports = YTSavet;