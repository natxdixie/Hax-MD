import { pinterest } from '@bochilteam/scraper'
let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `uhm... teks nya mana?\n\nContoh: ${usedPrefix + command} garuda`
  const json = await pinterest(text)
  conn.sendButton(m.chat, 'Nih Banh', wm, json.getRandom(), ['Lagi', `${usedPrefix + command} ${text}`], m)
}
handler.help = ['pinterest <query>']
handler.tags = ['internet']
handler.command = /^(pinterest)$/i

export default handler
