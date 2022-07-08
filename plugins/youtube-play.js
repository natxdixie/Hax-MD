import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `uhm... teks nya mana?\n\nContoh: ${usedPrefix + command} it will rain`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Tidak ditemukan'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendHydrated(m.chat, `
*Title:* ${title}
*Published:* ${publishedTime}
*Duration:* ${durationH}
*Views:* ${viewH}
*Description:* ${description}
  `.trim(), wm, thumbnail, url, 'Go To Youtube', null, null, [
    ['Audio', `${usedPrefix}yta ${url} yes`],
    ['Video', `${usedPrefix}ytv ${url} yes`]
  ], m)
}
handler.help = ['play'].map(v => v + ' <pencarian>')
handler.tags = ['yt']
handler.command = /^(p(lay)?)$/i

handler.exp = 0
handler.limit = true

export default handler