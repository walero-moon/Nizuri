import { Message, MessageEmbed } from 'discord.js'
import { Search } from 'spotify-web-api-node'
import { Menu } from 'discord.js-menu'
import { createSongEmbed } from './embed'

const menuButtons = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]

const generatePagesFromTracks = (pages, message: Message, args) => {
    return pages.map((page, i: number) => {
        let fields = page.tracks.map((track, trackId) => {
            return {
                name: menuButtons[trackId + 1],
                value: `${track.name} by ${track.artists[0].name} - ${track.album.name}`,
                inline: false
            }
        })
        fields.push([{
            name: '⬅️',
            value: 'Prev Page',
            inline: true
        }, {
            name:'➡️',
            value: 'Next Page',
            inline: true
        }])
        return {
            tracks: page.tracks,
            page: {
                name: String(i + 1),
                content: new MessageEmbed({
                    title: "Page #" + String(i + 1),
                    description: `Search results for: ***${args.join(' ')}***`,
                    fields: fields
                })
                .setAuthor(message.author.tag, message.author.displayAvatarURL()),
                reactions: {
                    '1️⃣': async () => {
                        return createSongEmbed(page.tracks[0], message)
                    },
                    '2️⃣': async () => {
                        return createSongEmbed(page.tracks[1], message)
                    },
                    '3️⃣': async () => {
                        return createSongEmbed(page.tracks[2], message)
                    },
                    '4️⃣': async () => {
                        return createSongEmbed(page.tracks[3], message)
                    },
                    '5️⃣': async () => {
                        return createSongEmbed(page.tracks[4], message)
                    },
                    '⬅️': 'previous',
                    '➡️': 'next',
                }
            }

        }
    })
}
const generateSongSearchMenu = (search: Search, size: number, message: Message, args) => {
    // create a list of pages, each containing n entries
    let pages: any = []
    for (let i = 0; i < search.body.tracks.items.length; i += size) {
        let n: number = i / size
        pages[n] = { tracks: search.body.tracks.items.slice(i, i + size) }
    }
    //console.log(JSON.stringify(pages))
    pages = generatePagesFromTracks(pages, message, args)
    return new Menu(message.channel, message.author.id, pages.map(page => page.page))
}
export { generateSongSearchMenu, generatePagesFromTracks }
