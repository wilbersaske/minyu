const ytSearch = require('yt-search');
const axios = require('axios');
const fetch = require('node-fetch');

class YouTubeHandler {
    constructor() {
        this.formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
        this.formatVideo = ['360', '480', '720', '1080', '1440', '2160'];
        this.payload = (query) => {
            return {
                context: {
                    client: {
                        hl: "pt",
                        gl: "BR",
                        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                        clientName: "WEB",
                        clientVersion: "2.20240628.01.00",
                        osName: "Windows",
                        osVersion: "10.0",
                        browserName: "Chrome",
                        browserVersion: "126.0.0.0",
                        utcOffsetMinutes: -180,
                    },
                    request: { useSsl: true }
                },
                query: `${query}`
            };
        };
    }

    async searchVideos(query) {
        return new Promise((resolve, reject) => {
            ytSearch(query).then(({ videos }) => {
                resolve(videos);
            }).catch(reject);
        });
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
            if (!this.formatAudio.includes(format) && !this.formatVideo.includes(format)) {
                return reject('Formato não disponível.');
            }
            try {
                const { data } = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=cac6b51ad6d7788b5d14e4a0c6d9b004035f8ce4`);
                if (data?.success) {
                    const downloadUrl = await this.cekProgress(data.id);
                    resolve({
                        dl_link: downloadUrl,
                        title: data.title,
                        image: data.info.image
                    });
                } else {
                    reject("Erro ao processar download.");
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async get(query, format) {
        return new Promise(async (resolve, reject) => {
            try {
                query = await this.extractID(query);
                const { data } = await axios.post(`https://www.youtube.com/youtubei/v1/search?prettyPrint=false`, this.payload(query));
                const info = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].videoRenderer;
                const down = await this.downConfig(`https://youtube.com/watch?v=${info.videoId}`, format);

                resolve({
                    dl_link: down.dl_link,
                    title: info.title.runs[0].text,
                    thumbnails: info.thumbnail.thumbnails.map(v => v.url),
                    channel: info.longBylineText.runs[0].text,
                    uploadDate: info.publishedTimeText?.simpleText || 'Sem informação',
                    viewsCount: info.viewCountText?.simpleText || 'Sem informação',
                    externalUrls: {
                        video: `https://youtube.com/watch?v=${info.videoId}`
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = YouTubeHandler;