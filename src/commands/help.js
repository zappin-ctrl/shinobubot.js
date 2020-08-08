import {getEmbed} from "../utility";
import {commands} from "../bot";
import fs from "fs";
import _ from "lodash";

const groupSeparator = '======================';
const helpFile = JSON.parse(fs.readFileSync("./assets/help.json", 'utf8'));

export const run = async (message) => {
    const embed = getEmbed()
        .setTitle("🍩 Here's a list of what i can do: 🍩")
        .setDescription('test');

    let text = [];
    let counter = 1;
    const count = Object.keys(helpFile).length;
    for (const group in helpFile) {
        text.push(`**${helpFile[group].title}**`);
        text.push(groupSeparator);
        if (!_.isUndefined(helpFile[group].description)) {
            text.push(helpFile[group].description);
        }

        let commandsSorted = [];
        for (let command in commands) {
            if (commands[command].helpGroup === group) {
                commandsSorted.push(command);
            }
        }
        commandsSorted = commandsSorted.sort();
        const groups = {};

        for (let command of commandsSorted) {
            const simpleGroup = commands[command].helpSimpleGroup
            if (!_.isUndefined(simpleGroup)) {
                if (!(simpleGroup in groups)) {
                    groups[simpleGroup] = [];
                }

                groups[simpleGroup].push(command);
                continue;
            }

            let commandExplanation = '**' + command + ' ' + (commands[command].helpArguments ?? '') + '**';
            if (!_.isUndefined(commands[command].help)) {
                commandExplanation += '\n' + commands[command].help;
            }
            text.push(commandExplanation);
        }

        for (let group of Object.keys(groups).sort()) {
            text.push("> " + groups[group].sort().join(" | "));
        }

        if (counter !== count) {
            text[text.length - 1] += '\n';
        }
        counter++;
    }

    embed.setDescription(text.join('\n\n'));

    await message.react("✅");
    try {
        await message.author.send(embed);
    } catch (e) {
        await message.channel.send("Your DMs are disabled!");
        await message.reactions.removeAll();
        try {
            await message.react('❌');
        } catch (e) {} // user blocked mod probably, ignore
    }
};

export const help = "Show this command";
export const helpGroup = 'utility';