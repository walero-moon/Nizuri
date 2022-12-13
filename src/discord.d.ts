import { Collection } from "discord.js";

declare module "discord.js" {
    interface Client {
        commands: Collection<unknown, Command>,
        cooldowns: Collection<unknown, unknown>
    }

    interface Command {
        name: string,
        description: string,
        aliases?: string[],
        usage?: string,
        cooldown?: number,
        args?: boolean,
        execute(message: any, args?: string[]): Promise<any>;
    }
}