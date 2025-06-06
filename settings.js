import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '51931651504' //Ejemplo: 573218138672

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
  ['51931651504', ' 𝑩𝒚 ঔৣ͜͡🔥͜͡𝑲𝒆𝒊𝒍𝒊 𝒔.𝒓🔥᮫꫶ฺ໋⃜𝆹𝅦ۣ𝄁᭄', true],
  ['56461177130',  'ঔৣ͜͡ீ͜❥🌺𝐁𝐎𝐓 𝐒𝐄𝐓︦︦𝐒𝐔𝐍𝐀˚', true]
  ['5720202020', ' ঔৣ͜͡ீ͜❥🌺𝐁𝐎𝐓 𝐒𝐄𝐓︦︦𝐒𝐔𝐍𝐀˚ 🜲', true],
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['51931651504'] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.vs = '2.2.0'
global.nameqr = 'ঔৣ͜͡ீ͜❥🌺𝐁𝐎𝐓 𝐒𝐄𝐓︦︦𝐒𝐔𝐍𝐀˚'
global.namebot = 'ঔৣ͜͡ீ͜❥🌺𝐁𝐎𝐓 𝐒𝐄𝐓︦︦𝐒𝐔𝐍𝐀˚'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.yukiJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '𝑩𝑶𝑻 𝑺𝑬𝑻𝑺𝑼𝑵𝑨'
global.botname = '『𝑩𝑶𝑻 𝑺𝑬𝑻𝑺𝑼𝑵𝑨•』'
global.wm = '𝑩𝑶𝑻 𝑺𝑬𝑻𝑺𝑼𝑵𝑨'
global.author = '𝑩𝒚 ঔৣ͜͡🔥͜͡𝑲𝒆𝒊𝒍𝒊 𝒔.𝒓🔥᮫꫶ฺ໋⃜𝆹𝅦ۣ𝄁᭄'
global.dev = '𝑩𝒚 ঔৣ͜͡🔥͜͡𝑲𝒆𝒊𝒍𝒊 𝒔.𝒓🔥᮫꫶ฺ໋⃜𝆹𝅦ۣ𝄁᭄'
global.textbot = 'ঔৣ͜͡ீ͜❥🌺𝐁𝐎𝐓 𝐒𝐄𝐓︦︦𝐒𝐔𝐍𝐀˚'
global.etiqueta = '𝑩𝒚 ঔৣ͜͡🔥͜͡𝑲𝒆𝒊𝒍𝒊 𝒔.𝒓🔥᮫꫶ฺ໋⃜𝆹𝅦ۣ𝄁᭄'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = 'Soles'
global.welcom1 = '❍ Edita Con El Comando setwelcome'
global.welcom2 = '❍ Edita Con El Comando setbye'
global.banner = 'https://raw.githubusercontent.com/wilbersaske/keili2023/refs/heads/main/src/1.jpg'
global.avatar = 'https://raw.githubusercontent.com/wilbersaske/keili2023/refs/heads/main/src/1.jpg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://whatsapp.com/channel/0029VbAYhpiDJ6HAM3YDi32i'
global.comunidad1 = 'https://whatsapp.com/channel/0029VbAYhpiDJ6HAM3YDi32i'
global.channel = 'https://whatsapp.com/channel/0029VbAYhpiDJ6HAM3YDi32i'
global.channel2 = 'https://whatsapp.com/channel/0029VbAYhpiDJ6HAM3YDi32i'
global.md = 'https://github.com/wilbersaske/minyu'
global.correo = 'wilbersaske@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VbAYhpiDJ6HAM3YDi32i';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "51931651504-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363416409380841@newsletter',
}
global.multiplier = 70

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
