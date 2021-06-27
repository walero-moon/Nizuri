import { Message, MessageEmbed } from 'discord.js'
import { Search } from 'spotify-web-api-node'
import { Menu } from 'discord.js-menu'

const menuButtons = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]

const generatePagesFromTracks = (pages, message: Message, args) => {
    return pages.map((page, i: number) => {
        return {
            tracks: page.tracks,
            page: {
                name: String(i + 1),
                content: new MessageEmbed({
                    title: "Page #" + String(i + 1),
                    description: `***${message.author.username}*** searched for: ***${args.join(' ')}***`,
                    fields: page.tracks.map((track, trackId) => {
                        return {
                            name: menuButtons[trackId+1],
                            value: `${track.name} by ${track.artists[0].name} - ${track.album.name}` ,
                            inline: false
                        }
                    }
                    )
                }),
                reactions: {
                    '1️⃣': 'extra',
                    '2️⃣': 'extra',
                    '3️⃣': 'extra',
                    '4️⃣': 'extra',
                    '5️⃣': 'extra',
                    '⬅️' : 'previous',
                    '➡️' : 'next',
                    '😀': async () => {
                        // You can run whatever you like in functions.
                        let res = await message.channel.send("Hey-")
                        setTimeout(() => {
                            return res.edit("listen!")
                        }, 1000)
                    }
                }
            }

        }
    })
}
const generateSongSearchMenu = (search: Search, size: number, message: Message, args) => {
    // create a list of pages, each containing n entries
    let pages: object[] = []
    for (let i = 0; i < search.body.tracks.items.length; i += size) {
        let n: number = i / size
        pages[n] = { tracks: search.body.tracks.items.slice(i, i + size) }
    }
    //console.log(JSON.stringify(pages))
    pages = generatePagesFromTracks(pages, message, args)
    console.log(pages)
    return new Menu(message.channel, message.author.id, pages.map(page => page.page))
}
export { generateSongSearchMenu, generatePagesFromTracks }
