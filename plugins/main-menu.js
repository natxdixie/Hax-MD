import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
const defaultMenu = {
  before: `
╭─「 %me 」
│ Hai, %name!
│
│ Limit : *%limit Limit*
│ Role : *%role*
│ Level : *%level (%exp / %maxexp)*
│ Total Exp : %totalexp
│ 
│ Date: *%week %weton, %date*
│ Date Islam: *%dateIslamic*
│ Time: *%time*
│
│ Uptime: *%uptime (%muptime)*
│ Database: %rtotalreg of %totalreg
╰────
%readmore`.trimStart(),
  header: '╭─「 %category 」',
  body: '│• %cmd %islimit %isPremium',
  footer: '╰────\n',
  after: `
`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, isOwner }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'sticker', 'kerang', 'quotes', 'group', 'premium', 'internet', 'stalk', 'anonymous', 'nulis', 'downloader', 'yt', 'tools', 'fun', 'database', 'vote', 'absen', 'quran', 'audio', 'owner', 'info']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Main',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'sticker': 'Sticker',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'group': 'Group',
    'premium': 'Premium',
    'internet': 'Internet',
    'stalk': 'Stalk',
    'anonymous': 'Anonymous Chat',
    'nulis': 'Nulis & Logo',
    'downloader': 'Downloader',
    'yt': 'YouTube',
    'tools': 'Tools',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Islam',
    'audio': 'Pengubah Suara',
    'info': 'Info',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerang') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'group') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
   if (teks == 'stalk') tags = {
    'stalk': 'Stalk'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'Nulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'yt') tags = {
    'yt': 'YouTube'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'owner') {
    if (!isOwner) {
        dfail('owner', m, conn)
        throw 0
    }
    tags = {
      'owner': 'Owner',
      'host': 'Host',
      'advanced': 'Advanced'
    }
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  
  
  
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      let aoa = `${ucapan()} ${name}.`.trim()
      const sections = [
      {
        title: `List Menu ${conn.user.name}`,
        rows: [
          { title: 'Semua Perintah', rowId: `${_p}? all` },
          { title: 'Game', rowId: `${_p}? game` },
          { title: 'Exp & Limit', rowId: `${_p}? xp` },
          { title: 'Stiker', rowId: `${_p}? stiker` },
          { title: 'Kerang Ajaib', rowId: `${_p}? kerang` },
          { title: 'Quotes', rowId: `${_p}? quotes` },
          { title: 'Group', rowId: `${_p}? group` },
          { title: 'Premium', rowId: `${_p}? premium` },
          { title: 'Internet', rowId: `${_p}? internet` },
          { title: 'Stalk', rowId: `${_p}? stalk` },
          { title: 'Anonymous', rowId: `${_p}? anonymous` },
          { title: 'Nulis & Logo', rowId: `${_p}? nulis` },
          { title: 'Downloader', rowId: `${_p}? downloader` },
          { title: 'YouTube', rowId: `${_p}? yt` },
          { title: 'Tools', rowId: `${_p}? tools` },
          { title: 'Fun', rowId: `${_p}? fun`},
          { title: 'Database', rowId: `${_p}? database` },
          { title: 'Vote & Absen', rowId: `${_p}? vote` },
          { title: 'Islam', rowId: `${_p}? quran` },
          { title: 'Pengubah Suara', rowId: `${_p}? audio` },
          { title: 'Info', rowId: `${_p}? info` },
          { title: 'Owner', rowId: `${_p}? owner`, description: 'Khusus Owner Bot' }
        ]
      }
    ]
    const listMessage = {
      text: aoa,
      footer: wm,
      title: null,
      buttonText: "Klik Disini",
      sections
    }
    return conn.sendMessage(m.chat, listMessage, { quoted: m })
    
    }

    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    conn.sendHydrated(m.chat, text.trim(), wm, fla + `${teks}`, 'https://instagram.com/ulhaqmz_', 'Instagram', null, null, [
      ['Donate', '.donasi']
    ], m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Selamat Malam"
  if (time >= 4) {
    res = "Selamat Pagi"
  }
  if (time > 10) {
    res = "Selamat Siang" 
  }
  if (time >= 15) {
    res = "Selamat Sore"
  }
  if (time >= 18) {
    res = "Selamat Malam"
  }
  return res
}
