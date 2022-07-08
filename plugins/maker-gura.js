import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
   let response = args.join(' ').split('|')
  if (!args[0]) throw 'ᴍᴀꜱᴜᴋᴋᴀɴ ᴘᴀʀᴀᴍᴇᴛᴇʀ'
  m.reply('Proses...')
  let res = `https://rimurubotz-api.herokuapp.com/api/gura?text=${response[0]}`
  conn.sendFile(m.chat, res, 'gura.png', `ꜱᴜᴅᴀʜ ᴊᴀᴅɪ`, m, false)
}
handler.help = ['logogura'].map(v => v + ' <text>')
handler.tags = ['nulis']
handler.command = /^(logogura|gura)$/i

handler.limit = true

export default handler