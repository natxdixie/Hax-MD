import { instagramStalk } from '@bochilteam/scraper'

let handler= async (m, { args, usedPrefix, command }) => {
    if (!args[0]) throw `uhm... usernya mana?\n\nContoh: ${usedPrefix + command} instagram`
    const {
        username,
        name,
        description,
        followersH,
        followingH,
        postsH,
    } = await instagramStalk(args[0])
    m.reply(`
${name} *(${username})*
https://instagram.com/${username.replace(/^@/, '')}
*${followersH}* Followers
*${followingH}* Following
*${postsH}* Posts
*Bio:* ${description}
`.trim())
}

handler.help = ['igstalk'].map(v => v + ' <username>')
handler.tags = ['stalk']

handler.command = /^(igstalk)$/i

export default handler