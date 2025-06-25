const fs = require('fs');
const { pegarAudioAleatorioBuffer } = require('./audiosAleatorios2');

function DLT_FL(filePath) {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

async function menuHandler(tedzinho, from, pushname, date, hora, info, reply, prefix, NomeDoBot) {
  try {
    const imagemMenu = "https://xatimg.com/image/TyANiC68n4eZ.jpg";

    // Envia áudio do menu
    const audioBuffer = await pegarAudioAleatorioBuffer();
    if (audioBuffer) {
      await tedzinho.sendMessage(from, {
        audio: audioBuffer,
        ptt: true,
        mimetype: "audio/mpeg"
      }, { quoted: info });
    } else {
      console.warn("⚠️ Falha ao carregar áudio do menu.");
      reply("⚠️ O áudio do menu não está disponível no momento.");
    }

    // Envia imagem com botões personalizados
    await tedzinho.sendMessage(from, {
      image: { url: imagemMenu },
      caption: `
╭─❍【🌸 *${NomeDoBot}* 🌸】❍─╮
│👩‍💻 𝗨𝘀𝘂𝗮́𝗿𝗶𝗮: *${pushname}*
│📆 𝗗𝗮𝘁𝗮: *${date}*
│⏰ 𝗛𝗼𝗿𝗮́𝗿𝗶𝗼: *${hora}*
╰────────────────────╯
      `.trim(),
      footer: `🔷 ${NomeDoBot} | Seu assistente com charme e inteligência 💙`,
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: '🌐 Comandos do Bot' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: "🌐 Lista completa",
              sections: [
                {
                  title: "🌟 Comandos Principais",
                  highlight_label: "By Fenrys V4",
                  rows: [
                    { title: "📜 Menu Principal", description: "Comandos básicos e mais utilizados.", id: `${prefix}menupp` },
                    { title: "🆕 Novos Comandos", description: "Veja o que há de novo no bot.", id: `${prefix}menunovo` },
                    { title: "👑 Menu do Dono", description: "Acesso exclusivo do criador.", id: `${prefix}menudono` },
                    { title: "🛡 Administração", description: "Ferramentas para gerenciar grupos.", id: `${prefix}menuadm` },
                    { title: "💠 Premium", description: "Funções especiais para usuários VIP.", id: `${prefix}menupremium` },
                    { title: "🎉 Brincadeiras", description: "Comandos para diversão no grupo.", id: `${prefix}brincadeiras` },
                    { title: "🖼 Efeitos Visuais", description: "Aplique efeitos com estilo.", id: `${prefix}Efeitosimg` },
                    { title: "🪙 Sistema de Coins", description: "Ganhe e use moedas virtuais.", id: `${prefix}menucoins` },
                    { title: "⚔️ Mundo RPG", description: "Aventuras, batalhas e evolução.", id: `${prefix}menurpg` },
                    { title: "🎨 Criação de Logos", description: "Gere logos personalizados.", id: `${prefix}menulogos` }
                  ]
                },
                {
                  title: "💖 Apoie o Projeto",
                  highlight_label: "Doações & Suporte",
                  rows: [
                    { title: "🌟 Doar via Pix", description: "Ajude o projeto com sua contribuição!", id: `${prefix}doar` }
                  ]
                },
                {
                  title: "📢 Comunidade Fenrys",
                  highlight_label: "Fique por dentro!",
                  rows: [
                    { title: "💬 Grupo Oficial", description: "Participe do nosso grupo!", id: `${prefix}grupobot` },
                    { title: "🤝 Parcerias", description: "Seja um parceiro do projeto!", id: `${prefix}parcerias` }
                  ]
                }
              ]
            })
          }
        }
      ],
      headerType: 1,
      viewOnce: true
    }, { quoted: info });
  } catch (error) {
    console.error("❌ Erro ao exibir menu:", error);
    reply("❌ Ocorreu um erro ao exibir o menu. Tente novamente mais tarde.");
  }
}
module.exports = {
  menuHandler
};