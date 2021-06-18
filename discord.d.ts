import { Message } from "discord.js";

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, Command>,
        cooldowns: Collection<unknown, unknown>
    }

    export interface Command {
        name: string,
        description: string,
        aliases: string[],
        args: string[],
        usage: string,
        guildOnly: boolean,
        cooldown: number,
        permissions: string,
        execute: (message: Message, args: string[]) => any // Can be `Promise<SomeType>` if using async
    }
}