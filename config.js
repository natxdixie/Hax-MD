import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['62895330026617', 'Ulhaq Mz']
]
global.mods = []
global.prems = [] 
global.APIs = {
  xteam: 'https://api.xteam.xyz',
  amel: 'https://melcanz.com'
}
global.APIKeys = {
  'https://api.xteam.xyz': 'NezukoTachibana281207',
  'https://melcanz.com': 'melcantik'
}

global.packname = 'Created By'
global.author = 'Hax Botz'
global.wm = '𝙷𝚊𝚡 𝙼𝙳'

global.fla = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='

global.multiplier = 69

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
