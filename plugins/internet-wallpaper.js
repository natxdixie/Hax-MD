import { wallpaper, wallpaperv2 } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `uhm... teks nya mana?\n\nContoh: ${usedPrefix + command} garuda`
    const res = await (/2/.test(command) ? wallpaperv2 : wallpaper)(text)
    const img = res[Math.floor(Math.random() * res.length)]
    conn.sendButton(m.chat, 'Nih Banh', wm, img, ['Lagi', `${usedPrefix + command} ${text}`], m)
}
handler.help = ['wallpaper', 'wallpaper2']
handler.tags = ['internet']

handler.command = /^(wallpaper2?)$/i

export default handler
