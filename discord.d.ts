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
        category: string,
        visible: boolean,
        cooldown: number,
        permissions: any,
        execute: (message: Message, args: string[]) => any // Can be `Promise<SomeType>` if using async
    }

    export interface Message {
        channel: TextChannel | DMChannel | NewsChannel
    }

    export interface GuildChannel {
        permissionsFor: (memberOrRole: string | Message | GuildMember | User | Role) => Readonly<Permissions>
    }

    export interface DMChannel {
        permissionsFor: (memberOrRole: string | Message | GuildMember | User | Role) => Readonly<Permissions>
    }

    export interface NewsChannel {
        permissionsFor: (memberOrRole: string | Message | GuildMember | User | Role) => Readonly<Permissions>
    }
}