import { execSync } from 'child_process'
import fs from 'fs'
let handler = async (m, { conn, text, isROwner }) => {
    if (global.conn.user.jid == conn.user.jid) {
        let stdout = execSync('git remote set-url origin https://github.com/ImRHns/Mars-MD.git && git pull' + (isROwner && text ? ' ' + text : ''))
        if (isROwner) fs.readdirSync('plugins').map(v => global.reload('', v))
        m.reply(stdout.toString())
    }
}
handler.help = ['update']
handler.tags = ['host']
handler.command = /^(u(pdate)?)$/i

handler.rowner = true

export default handler
