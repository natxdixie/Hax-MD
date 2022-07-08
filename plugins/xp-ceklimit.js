let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    m.reply(`Limit kamu ${user.limit}`)
}
handler.help = ['ceklimit']
handler.tags = ['xp']
handler.command = /^(ceklimit)$/i

export default handler