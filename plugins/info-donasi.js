let handler =  m => m.reply(`
╭─「 Donasi 」
│ • Gopay: 0895330026617
╰────
`.trim())
handler.help = ['donasi']
handler.tags = ['info']

handler.command = /^dona(te|si)$/i

export default handler