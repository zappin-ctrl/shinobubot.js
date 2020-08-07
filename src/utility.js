import client from "./bot";
import Discord from "discord.js";
import axios from "axios";
import {customImageList} from "./bot";
import logger from "./logger";
import {commands, commandAliases} from "./bot";
import fs from "fs";
import _ from "lodash";
import {promisify} from "util";
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export const sleep = promisify(setTimeout);

export function setActivity(client) {
    client.user.setActivity(process.env.PREFIX + 'help | made by ' + process.env.AUTHOR);
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const getNewDatabase = (filename) => {
    return low(new FileSync(filename + ".json"));
}

export function getUserFromMention(message) {
    if (!message) {
        return undefined;
    }

    if (message.startsWith('<@') && message.endsWith('>')) {
        (message = message.slice(2,-1)).startsWith("!") && (message=message.slice(1));
        return client.users.cache.get(message);
    }

    return client.users.cache.get(message)
}

async function runReactionCommand(message, args, argsclean, command) {
    const info = commands[command].info;
    if (_.isUndefined(info)) {
        logger.warning(`Command ${command} was called but no info was found for it`);
        return;
    }

    await handleSimplePost(message, args, info.url, info.mention, info.noMention, info.imagePath, info.imageReplaceUrl);
}

async function runListReactionCommand(message, args, argsclean, command) {
    const info = commands[command].info;
    if (_.isUndefined(info)) {
        logger.warning(`Command ${command} was called but no info was found for it`);
        return;
    }

    await handleLocalImagePost(message, args, info.key, info.mention, info.noMention);
}

export function addCommand(key, data, aliases = []) {
    if (key in commands) {
        logger.error(`Command ${key} is already defined`);
        process.exit(-1);
    }

    commands[key] = data;
    if (aliases !== null && !_.isUndefined(aliases)) {
        if (!_.isArray(aliases)) {
            aliases = [aliases];
        }

        for (let alias of aliases) {
            if (alias in commandAliases) {
                logger.error(`Cannot reuse alias ${alias}, quitting.`);
                process.exit(-1);
            }

            commandAliases[alias] = key;
        }
    }
}

export function deleteCommand(key) {
    delete commands[key];
    for (const i in commandAliases) {
        if (key === commandAliases[i]) {
            delete commandAliases[i];
        }
    }
}

const commandFiles = [{
    file: './assets/reaction-commands-api.json',
    func: runReactionCommand
}, {
    file: './assets/reaction-commands-local-list.json',
    func: runListReactionCommand
}, {
    file: './assets/canvas-commands.json',
    func: () => {}
}];

export function loadCommandsFromJson() {
    for (const file of commandFiles) {
        const commandsInFile = JSON.parse(fs.readFileSync(file.file, 'utf8'));
        for (const key in commandsInFile) {
            deleteCommand(key);

            const command = commandsInFile[key];
            addCommand(key, {
                run: file.func,
                info: command,
                command: key
            }, command.aliases);
        }
    }
}

function applyDefault(variable, value) {
    if (_.isUndefined(variable)) {
        return value;
    }

    return variable;
}

/**
 * Helper function that returns "global" embed template.
 *
 * @returns {module:"discord.js".MessageEmbed}
 */
export function getEmbed() {
    return new Discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR);
}

export function removeCommandPart(string) {
    const message = string.split(" ");
    message.shift();
    return message.join(" ");
}

export function isOwner(message) {
    return message.author.id === process.env.OWNER || process.env.OWNER === 'any';
}

async function prepareEmbedForPostHandling(message, args, mentionString, noMentionString = null) {
    let embed = getEmbed();
    if (args[0]) {
        const user = getUserFromMention(args[0]);
        if (!user) {
            await message.reply("Please use a proper mention.");
            return null;
        }

        embed.setDescription(mentionString.replace('$1', `<@${message.author.id}>`).replace('$2', `<@${user.id}>`));
    } else {
        if (noMentionString !== null) {
            embed.setDescription(noMentionString.replace('$1', `<@${message.author.id}>`));
        }
    }

    return embed;
}

export async function handleLocalImagePost(message, args, storage, mentionString, noMentionString = null) {
    noMentionString = applyDefault(noMentionString, null);

    const embed = await prepareEmbedForPostHandling(message, args, mentionString, noMentionString);
    if (embed === null) {
        return;
    }

    if (!(storage in customImageList)) {
        logger.error(`Trying to access invalid storage key in image-list.json (${storage})`);
        return;
    }

    embed.setImage(customImageList[storage][Math.floor(Math.random() * customImageList[storage].length)]);
    await message.channel.send(embed);
}

export async function handleSimplePost(message, args, url, mentionString, noMentionString = null, imagePath = 'url', imageReplaceUrl = null) {
    // so that there's no need to fix up the input from json files
    noMentionString = applyDefault(noMentionString, null);
    imagePath = applyDefault(imagePath, 'url');
    imageReplaceUrl = applyDefault(imageReplaceUrl, null);

    const image = async () => {
        const response = await axios.get(url);
        if (imagePath in response.data) {
            if (imageReplaceUrl !== null) {
                return imageReplaceUrl.replace('$1', response.data[imagePath]);
            }

            return response.data[imagePath];
        }

        return '';
    };

    const embed = await prepareEmbedForPostHandling(message, args, mentionString, noMentionString);
    if (embed === null) {
        return;
    }

    embed.setImage(await image());
    await message.channel.send(embed);
}

const requestDb = getNewDatabase('assets/requests');
requestDb.defaults({
    requests: []
}).write();

export {requestDb};