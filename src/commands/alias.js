import {commands, commandAliases} from "../bot";

export const run = async (message, args) => {
    const cmd = commands[args[0]] ?? null;

    if (null === cmd) {
        await message.channel.send("You need to specify a valid command");
        return;
    }

    const aliases = [];
    for (let i in commandAliases) {
        if (commandAliases[i] === cmd.command) {
            aliases.push(i);
        }
    }

    if (aliases.length) {
        await message.channel.send(`Command ${cmd.command} has the following aliases:\n> ${aliases.join(" ")}`);
    } else {
        await message.channel.send(`Command ${cmd.command} has no aliases.`);
    }
};

export const help = "List aliases for a command";
export const helpArguments = '[command]';
export const helpGroup = 'utility';
