let handler =  m => m.reply(`
╭─「 Donasi 」
│ • https://saweria.co/ulhaqmz
╰────
`.trim())
handler.help = ['donasi']
handler.tags = ['info']

handler.command = /^dona(te|si)$/i

export default handler
