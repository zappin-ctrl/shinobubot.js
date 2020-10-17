import client from "../bot";
import util from 'util';
import { isOwner } from "../utility";
import fs from 'fs';

export const run = async(message, args) => {
    async function send(a) {
        await message.channel.send(`\`\`\`js\n${a}\`\`\``);
    }
    async function kekw(h) {
        let stdout;
        try {
            stdout = fs.readFileSync(`./src/commands/${h}.js`, { encoding: 'utf8' });
        } catch {
            await message.channel.send(`That command doesn't exist.`);
        }
        let count = stdout.length / 1000;
        for (let i = 0; i < count; i = i + 1.85) {
            if (count - i > 1.85) {
                if (i === 0) {
                    send(stdout.substring(0, 1850));
                } else {
                    send(stdout.substring(i * 1000, i * 1000 + 1850));
                }
            } else {
                if (i === 0) {
                    send(stdout.substring(0, stdout.length));
                } else {
                    send(stdout.substring(i * 1000, stdout.length));
                }
            }
        }
    }

    if (isOwner(message)) {
        const h = args[0];
        if (!h) {
            await message.channel.send(`Specify a command's name.`);
            return;
        };
        try {
            kekw(h);
        } catch {
            await message.channel.send(`There's been an error.`);
            return;
        };
    };
};

export const help = "View the source code for commands.";
export const helpGroup = 'utility';
