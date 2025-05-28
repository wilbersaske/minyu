let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    
    let txt = `
    
*╭┅─═￭৯•𓆩❤︎𞋯𓆪•৯￭═─┅╮*
┃ ✦@${userId.split('@')[0]}✦
*╰┅─═￭৯•𓆩❤︎𞋯𓆪•৯￭═─┅╯*
𖥔 ִ ۫  ּ ⋆ ִ ۫  ּ ⊹  ˑ ִ  ִֶָ  ִ ۫  ּ 𖥔 ִ ۫  ּ ⊹  ˑ  ִ ⋆ִ ۫  ּ ˑ ִ  ִֶָ
╰─────────────
*╭┅─═￭৯•𓆩❤︎𞋯𓆪•৯￭═─┅╮*
┃ *🔥Hola ${name},*
*╰┅─═￭৯•𓆩❤︎𞋯𓆪•৯￭═─┅╯*
𖥔 ִ ۫  ּ ⋆ ִ ۫  ּ ⊹  ˑ ִ  ִֶָ  ִ ۫  ּ 𖥔 ִ ۫  ּ ⊹  ˑ  ִ ⋆ִ ۫  ּ ˑ ִ  ִֶָ
┏━꯭━ׅ━꯭━ׅ━꯭━ׅ━꯭━ׅ━꯭━ׅ━┓
┃    *M E N U + ANIME🦊*
┃Hola, bienvenid@s  
┃a mi blog en este blog
┃subiré fanfics, series, imágenes y mucho más
┃También daré recomendaciones de
┃distintos animes de todo genero :D
┃⢷⡪⢷⡪⢷⡪⢷⡪⢷⡪⢷⡪⢷⡪⢷⡪
┣ ⸎⃟🦊 .
┣ ⸎⃟🦊 .anime (randows)
┣ ⸎⃟🦊 .kurumi
┣ ⸎⃟🦊 .miku
┣ ⸎⃟🦊 .itori
┣ ⸎⃟🦊 .sasuke
┣ ⸎⃟🦊 .naruto
┣ ⸎⃟🦊 .indo  (indonesia)
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .videololi  (randow specials)
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┣ ⸎⃟🦊 .proximamente
┗━꯭━ׅ━꯭━ׅ━꯭━ׅ━꯭━ׅ━꯭━ׅ━꯭┛
𖥔 ִ ۫  ּ ⋆ ִ ۫  ּ ⊹  ˑ ִ  ִֶָ  ִ ۫  ּ 𖥔 ִ ۫  ּ ⊹  ˑ  ִ ⋆ִ ۫  ּ ˑ ִ  ִֶָ
  `.trim()

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: botname,
              body: textbot,
              thumbnailUrl: banner,
              sourceUrl: redes,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m })

}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / (1000 * 60)) % 60)
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    return `${hours}h ${minutes}m ${seconds}s`
}
