import { isOwner } from "../utility";
import fs from 'fs';

export const run = async(message, args) => {
    async function send(a) {
        await message.channel.send(`\`\`\`js\n${a}\`\`\``);
    }
    async function pogger(j) {
        let stdout;
        let n
        try {
            stdout = fs.readFileSync(`./src/commands/${j}.js`, { encoding: 'utf8' }).split(/\n/);
        } catch {
            await message.channel.send(`That command doesn't exist.`);
            return;
        }
        let count = stdout.length;
        for (let i = 0; i < count; i++) {
            n = n + `\n${i}. ${stdout[i]}`;
            if (n.length > 1800) {
                send(n.replace(`undefined`, ``));
                n = "";
            }
        }
        send(n.replace(`undefined`, ``));
    }

    async function keke(o, a, b) {
        let stdout;
        let y;
        try {
            stdout = fs.readFileSync(`./src/commands/${o}.js`, { encoding: 'utf8' }).split(/\n/);
        } catch {
            await message.channel.send(`That command doesn't exist.`);
        }
        if (a > stdout.length || b > stdout.length) {
            await message.channel.send(`**${o}.js** only has \`${stdout.length}\` lines.`);
            return;
        }
        if (b - a > 40) {
            await message.channel.send(`That code doesn't fit.`);
            return;
        } else {
            for (let i = a; i < b + 1; i++) {
                y = y + `\n${i}. ${stdout[i]}`;
            }
            send(y.replace(`undefined`, ""));
        }
    }

    if (isOwner(message)) {
        const h = args[0];
        if (!h) {
            await message.channel.send(`Specify a command's name.`);
            return;
        };
        try {
            if (!args[1]) {
                pogger(h);
            } else if (args[1] && args[2]) {
                let arga = parseInt(args[1]);
                let argb = parseInt(args[2]);
                if (isNaN(arga) === true || isNaN(argb) === true || arga >= argb) {
                    await message.channel.send(`Usage is \`+source [command] [start line #] [end line #]\`.`);
                    return;
                }
                keke(args[0], arga, argb);
            } else {
                await message.channel.send(`Usage is \`+source [command] [start line #] [end line #]\`.`);
                return;
            }
        } catch {
            await message.channel.send(`There's been an error.`);
            return;
        };
    };
};

export const help = "View the source code for commands.";
export const helpGroup = 'utility';