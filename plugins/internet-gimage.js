import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `uhm... teks nya mana?\n\nContoh: ${usedPrefix + command} garuda`
    const res = await googleImage(text)
    conn.sendButton(m.chat, 'Nih Banh', wm, res.getRandom(), ['Lagi', `${usedPrefix + command} ${text}`], m)
}
handler.help = ['gimage <query>']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i

export default handler
