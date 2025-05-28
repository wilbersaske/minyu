/**
 * Comando para mostrar la información del creador
 * Se activa mediante #micreador
 */

let handler = async (m, { conn }) => {
    try {
      // Información del creador
      const creatorInfo = `❍ *Creador:*
  
  ᰔᩚ 𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔
  > 🜸 Rol » *Creador*
  > ✧ GitHub » https://github.com/root
  > Numeno » wa.me/51931651504`
  
      // Variables para la imagen y el enlace del creador (usa las globales si existen)
      const creatorImage = global.creatorImage || 'https://i.imgur.com/whjlJSf.jpg' // Imagen por defecto
      const githubLink = 'https://github.com/root'
      const numberLink = 'https://wa.me/51931651504'
  
      // Crear un mensaje con vista previa externa (thumbnail más grande)
      await conn.sendMessage(m.chat, {
        text: creatorInfo,
        contextInfo: {
          externalAdReply: {
            title: 'wilbersaske - Creador',
            body: '✧ Desarrollador de setsuna Bot',
            thumbnailUrl: creatorImage,
            sourceUrl: githubLink,
            mediaType: 1,
            showAdAttribution: false,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m })
  
      // Enviar un segundo mensaje con botones de contacto
      const buttons = [
        {buttonId: 'github', buttonText: {displayText: '✧ GitHub'}, type: 1},
        {buttonId: 'whatsapp', buttonText: {displayText: '📱 WhatsApp'}, type: 1}
      ]
      
      const buttonMessage = {
        text: '¿Quieres contactar al creador?',
        footer: '👾 Selecciona una opción',
        buttons: buttons,
        headerType: 1
      }
      
      await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
      
      // Manejador para botones de contacto
      const contactHandler = async (buttonId) => {
        if (buttonId === 'github') {
          await conn.sendMessage(m.chat, { text: `✧ GitHub del creador: ${githubLink}` }, { quoted: m })
        } else if (buttonId === 'whatsapp') {
          await conn.sendMessage(m.chat, { text: `📱 WhatsApp del creador: ${numberLink}` }, { quoted: m })
        }
      }
      
      // Registrar el manejador para esta interacción
      if (!global.buttonHandlers) global.buttonHandlers = {}
      global.buttonHandlers.contactCreator = contactHandler
      
    } catch (error) {
      console.error('Error en comando micreador:', error)
      m.reply('❌ Ocurrió un error al mostrar la información del creador.')
    }
  }
  
  // Registrar los comandos
  handler.command = ['micreador', 'creador', 'owner', 'creator', 'dueño']
  handler.tags = ['info']
  handler.help = ['micreador']
  
  export default handler
