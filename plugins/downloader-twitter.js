import { twitterdlv2 } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `uhm... urlnya mana?\n\nContoh: ${usedPrefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`
    const res = await twitterdlv2(args[0])
    let { url, quality } = res[1]
    conn.sendFile(m.chat, url, 'twitter.mp4', quality, m)
}
handler.help = ['twitter'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(twitter|twt(dl)?)$/i

handler.limit = true

export default handler
