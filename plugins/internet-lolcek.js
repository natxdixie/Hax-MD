import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args }) => {
    let res = await fetch(`https://api.lolhuman.xyz/api/checkapikey?apikey=${args[0]}`)
    if (!args[0]) return m.reply('Apikeynya mana?')
    let json = await res.json()
    let { result } = await json
    let { username, requests, today, account_type, expired} = result
    if (result == "error") return m.reply('Apikey Invalid!')
    m.reply(`*CHECK APIKEY LOLHUMAN*
• *Apikey:* ${args[0]}
• *Name:* ${username}
• *Total Hit:* ${requests}
• *Hit Today:* ${today}
• *Account* ${account_type}
• *Expired:* ${expired}
`.trim())
}
handler.help = ['lolcekapi']
handler.tags = ['internet']
handler.command = /^(lolcekapi|lolcek)$/i

export default handler
