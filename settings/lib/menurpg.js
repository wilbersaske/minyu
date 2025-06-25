const moment = require('moment-timezone');
const imageConfig = require('./Ima/Imagens.json');

let ultimaImagem = null;

function pegarImagemAleatoria(imagens) {
    let novaImagem;
    do {
        novaImagem = imagens[Math.floor(Math.random() * imagens.length)];
    } while (novaImagem === ultimaImagem && imagens.length > 1);
    ultimaImagem = novaImagem;
    return novaImagem;
}

module.exports = (prefix, NomeDoBot, sender) => {
    if (!imageConfig || !imageConfig.brincadeira || !Array.isArray(imageConfig.brincadeira.mainImage)) {
        throw new Error("mainImage não disponível no arquivo de configuração.");
    }

    const imagens = imageConfig.brincadeira.mainImage;
    if (imagens.length === 0) {
        throw new Error("Nenhuma imagem disponível para o menu RPG.");
    }

    const imagemAleatoria = pegarImagemAleatoria(imagens);
    const thumbnailAdUrl = 'https://xatimg.com/image/47FHqq0plr88.jpg';
    const linkOficial = 'https://tedzinho.online';
    const horarioAtual = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
    const dataAtual = moment().format('DD/MM/YYYY');

    const textoMenuRPG = `
╭── 🎮 MENU RPG ──╮
│ 📅 Data: ${dataAtual}
│ ⏰ Hora: ${horarioAtual}
│ 👤 Usuário: @${sender.split("@")[0]}
╰────────────────────╯

━━━━━━━━━━━━━━━
📋 INICIAIS
━━━━━━━━━━━━━━━
📌 Registrar → ${prefix}registrorpg  
🛍️ Comprar Escova → ${prefix}comprarescova  
🪥 Escovar os Dentes → ${prefix}escovar  

━━━━━━━━━━━━━━━
💼 TRABALHO & PROGRESSO
━━━━━━━━━━━━━━━
💼 Trabalhar → ${prefix}trabalhar  
📊 Status Geral → ${prefix}statusrpg  

━━━━━━━━━━━━━━━
🏦 BANCO & FINANÇAS
━━━━━━━━━━━━━━━
🏦 Abrir Banco → ${prefix}abrirbanco  
💳 Minha Conta → ${prefix}minhaconta  
💸 Operações Bancárias:  
💰 Sacar → ${prefix}sacarrpg  
💼 Depositar → ${prefix}depositarrpg  
📊 Saldo → ${prefix}saldorpg  
📈 Rendimentos → ${prefix}rendimentorpg  
🔁 Transferência → ${prefix}transferirrpg  
🏅 Ranking de Bancos → ${prefix}rankbancos  
🏛️ Banco Central → ${prefix}bancorpg  

━━━━━━━━━━━━━━━
🛍️ LOJAS & LUXO
━━━━━━━━━━━━━━━
🏬 Loja de Luxo → ${prefix}lojadeluxorpg  
💎 Comprar de Luxo → ${prefix}comprarrpgdeluxo  

━━━━━━━━━━━━━━━
🚗 CARROS & GARAGEM
━━━━━━━━━━━━━━━
🚗 Meus Carros → ${prefix}meuscarros  
🅿️ Garagem → ${prefix}garagemrpg  
💳 Pagar IPVA → ${prefix}pagarpva  

━━━━━━━━━━━━━━━
🏠 CASAS & IMÓVEIS
━━━━━━━━━━━━━━━
🏠 Loja de Casas → ${prefix}lojacasasrpg  
🏡 Comprar Casa → ${prefix}comprarrpgcasa  
🏘️ Minhas Casas → ${prefix}minhascasasrpg  

━━━━━━━━━━━━━━━
🌱 MODOS DE VIDA
━━━━━━━━━━━━━━━
🌍 Ver Modos de Vida → ${prefix}modosvida  
🎯 Escolher Vida → ${prefix}escolhervida  

━━━━━━━━━━━━━━━
🎲 AÇÃO & RISCO
━━━━━━━━━━━━━━━
🎰 Casa de Apostas → ${prefix}apostarrpg  
🕵️ Assaltar Jogador → ${prefix}assaltarrpg  
🪪 Pagar Fiança → ${prefix}pagarfianca  

━━━━━━━━━━━━━━━
💸 PIX & INVESTIMENTOS
━━━━━━━━━━━━━━━
💠 Meu Pix → ${prefix}Meupix  
📤 Fazer Pix → ${prefix}fazerpix  

━━━━━━━━━━━━━━━
🚪 SAIR DO RPG
━━━━━━━━━━━━━━━
❌ Sair do RPG → ${prefix}sairrpg  
    `;

    return {
        imagem: {
            image: { url: imagemAleatoria },
            caption: textoMenuRPG,
            contextInfo: {
                mentionedJid: [sender],
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 1,
                    mediaUrl: null,
                    title: `⚡️ ${NomeDoBot} ⚡️`,
                    body: `ミ★ 》 𝘴𝘪𝘵𝘦 𝘰𝘧𝘤《★彡`,
                    sourceUrl: linkOficial,
                    thumbnailUrl: thumbnailAdUrl,
                },
            },
        },
        audio: {
            audio: { url: 'https://c.top4top.io/m_3439grqmu7.mp3' },
            mimetype: 'audio/mpeg',
            ptt: true,
        }
    };
};