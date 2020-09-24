import client from "./bot";
import Discord from "discord.js";
import axios from "axios";
import {customImageList} from "./bot";
import logger from "./logger";
import {commands, commandAliases} from "./bot";
import fs from "fs";
import _ from "lodash";
import {promisify} from "util";
import Canvas from "canvas";

export const sleep = promisify(setTimeout);

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

export function getStringableArray(data) {
    const d = [];

    if (_.isString(data)) {
        d.push(data);
    } else if (_.isArray(data)) {
        for (let i of data) {
            if (_.isString(i)) {
                d.push(i);
            }
        }
    }

    if (d.length) {
        return d;
    }

    return null;
}

export function setActivity(client) {
    client.user.setActivity(process.env.PREFIX + 'help | ' + process.env.PREFIX + 'suggest');
}

export function version() {
    return packageJson.version;
}

export function getUserAgent() {
    return 'ShinobuBot/' + version();
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export async function getUserFromMention(message, messageObj, findFromText = true) {
    if (!message) {
        return undefined;
    }

    if (message.startsWith('<@') && message.endsWith('>')) {
        (message = message.slice(2,-1)).startsWith("!") && (message=message.slice(1));
        return client.users.cache.get(message);
    }

    if (findFromText) {
        const members = await messageObj.guild.members.fetch({ query: message, limit: 1 });
        const m = members.first();
        if (m) {
            return m.user;
        }
    }

    return client.users.cache.get(message)
}

export function ellipseText(string, length = 300) {
    if (string.length > 300) {
        string = string.substr(0, length - 3) + "...";
    }

    return string;
}

export function applyMentions(string, userA, userB = null) {
    if (_.isUndefined(string)) {
        return '';
    }

    string = string
        .replace('$1', `<@${userA.id}>`)
        .replace('$!1', userA.username);

    if (null !== userB && !_.isUndefined(userB)) {
        string = string
            .replace('$2', `<@${userB.id}>`)
            .replace('$!2', userB.username);
    }

    return string;
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

async function runCanvasReactionCommand(message, args, argsclean, command) {
    const info = commands[command].info;
    if (_.isUndefined(info)) {
        logger.warning(`Command ${command} was called but no info was found for it`);
        return;
    }

    let user = null;
    if (!args[0] || !(user = await getUserFromMention(args[0], message))) {
        await message.reply("please use a proper mention");
        return;
    }

    message.channel.startTyping(); // do NOT await this, it freezes the execution.
    const canvas = Canvas.createCanvas(info.width, info.height);
    const ctx = canvas.getContext('2d');

    const canvasFunctions = await import("./canvasLogic");

    ctx.drawImage(await Canvas.loadImage(info.image), 0, 0, canvas.width, canvas.height);
    canvasFunctions[command](
        ctx,
        await Canvas.loadImage(message.author.displayAvatarURL({format: "jpg"})),
        await Canvas.loadImage(user.displayAvatarURL({format: "jpg"})),
        canvas
    );

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'image.jpg');
    message.channel.stopTyping();
    await message.channel.send(applyMentions(info.mention, message.author, user), attachment);
}

export function getEmoji(message) {
    const emojiId = message.replace(/<a?:(.*?):+/g, '').replace(/>+/g, '');
    let imageUrl = `https://cdn.discordapp.com/emojis/${emojiId}`;
    let animated = true;
    if (message.indexOf('<a:') === 0) {
        imageUrl += '.gif';
    } else if (message.indexOf('<:') === 0) {
        imageUrl += '.png';
        animated = false;
    } else {
        throw Error("Not an emoji");
    }

    return [animated, imageUrl, emojiId];
}

export async function getImageFromMessage(message, sources, args) {
    let image = null;
    const arr = message.cleanContent.split(" ");
    let secondArgument = null;
    if (arr.length >= 2) {
        secondArgument = arr[1];
    }

    for (const source of sources) {
        if (source === 'attachment') {
            if (message.attachments.size > 0) {
                image = message.attachments.first().url;
            }
        } else if (source === 'emote') {
            if (secondArgument) {
                try {
                    const [animated, imageUrl] = getEmoji(secondArgument);
                    image = imageUrl;
                } catch {
                    // todo: add logic later
                }
            }
        } else if (source === 'link') {
            if (secondArgument) {
                try {
                    const response = await axios.head(secondArgument);
                    for (const key of Object.keys(response.headers)) {
                        if (key.toLocaleLowerCase() === 'content-type' && response.headers[key].indexOf('image') !== -1) {
                            image = secondArgument;
                            break;
                        }
                    }
                } catch {
                    // todo: add logic later (possibly 404 or other codes, just ignore them)
                }
            }
        } else if (source === 'last_image' && secondArgument === '^') {
            const messages = await message.channel.messages.fetch({ limit: 11 }); // 1 more because this fetches our command
            messages.forEach((message) => {
                if (image !== null) {
                    return;
                }

                if (message.attachments.size > 0) {
                    image = message.attachments.first().url;
                }
            });
        } else if (source === 'avatar') {
            if (secondArgument) { // check for mention first
                const user = await getUserFromMention(args[0], message);
                if (user) {
                    image = user.displayAvatarURL({format: "jpg", dynamic: true, size: 128});
                }
            }

            if (image === null) {
                image = message.author.displayAvatarURL({format: "jpg", dynamic: true, size: 128});
            }
        }

        if (image !== null) {
            break;
        }
    }

    return image;
}

async function runRemoteCanvasCommand(message, args, argsclean, command) {
    const info = commands[command].info;
    if (_.isUndefined(info)) {
        logger.warning(`Command ${command} was called but no info was found for it`);
        return;
    }

    let sources = ['attachment', 'emote', 'link', 'last_image', 'avatar'];
    if (_.isArray(info.sources)) {
        sources = info.sources;
    }

    const imageSrc = await getImageFromMessage(message, sources, args);
    if (!imageSrc) {
        await message.channel.send("No images found.");
        return;
    }

    const canvasFunctions = await import("./canvasTransformLogic");
    console.log(canvasFunctions);

    try {
        message.channel.startTyping(); // do NOT await this, it freezes the execution.
        const image = await Canvas.loadImage(imageSrc);

        const canvas = Canvas.createCanvas(image.width * (_.isUndefined(info.width) ? 1 : info.width), image.height * (_.isUndefined(info.height) ? 1 : info.height));

        const ctx = canvas.getContext('2d');

        const fn = canvasFunctions[command] ?? function (ctx, image, canvas) {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        fn(ctx, image, canvas, imageSrc);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'image.jpg');
        
        await message.channel.send(applyMentions(info.noMention, message.author), attachment);
    } catch { // image creation might fail
        
        await message.channel.send("No images found.");
    } finally {
        message.channel.stopTyping();
    }
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
                logger.error(`Cannot reuse alias ${alias} (already used for ${commandAliases[alias]}), quitting.`);
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
    func: runReactionCommand,
    save: true
}, {
    file: './assets/reaction-commands-local-list.json',
    func: runListReactionCommand,
    save: true
}, {
    file: './assets/canvas-commands.json',
    func: runCanvasReactionCommand,
    save: false
}, {
    file: './assets/canvas-manipulation-commands.json',
    func: runRemoteCanvasCommand,
    save: false
}];

export const genericCommandData = {};

export function loadCommandsFromJson() {
    for (const file of commandFiles) {
        const commandsInFile = JSON.parse(fs.readFileSync(file.file, 'utf8'));
        for (const key in commandsInFile) {
            deleteCommand(key);

            const command = commandsInFile[key];
            if (file.save) {
                genericCommandData[key] = command;
            }

            addCommand(key, {
                run: file.func,
                info: command,
                command: key,
                help: command.help,
                helpGroup: command.helpGroup,
                helpArguments: command.helpArguments,
                helpSimpleGroup: command.helpSimpleGroup
            }, command.aliases);
        }
    }
}

export function applyDefault(variable, value) {
    if (_.isUndefined(variable)) {
        return value;
    }

    return variable;
}

export function applyDefaultWithNull(variable, value) {
    variable = applyDefault(variable, value);
    if (_.isNull(variable)) {
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
    let strings = null;
    if (args[0]) {
        const user = await getUserFromMention(args[0], message);
        if (!user) {
            await message.reply("Please use a proper mention.");
            return null;
        }

        if ((strings = getStringableArray(mentionString)) !== null) {
            embed.setDescription(applyMentions(_.sample(strings), message.author, user));
        }
    } else {
        if ((strings = getStringableArray(noMentionString)) !== null) {
            embed.setDescription(applyMentions(_.sample(strings), message.author));
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

    embed.setImage(_.sample(customImageList[storage]));
    await message.channel.send(embed);
}

export async function handleSimplePost(message, args, url, mentionString, noMentionString = null, imagePath = 'url', imageReplaceUrl = null) {
    // so that there's no need to fix up the input from json files
    noMentionString = applyDefault(noMentionString, null);
    imagePath = applyDefault(imagePath, 'url');
    imageReplaceUrl = applyDefault(imageReplaceUrl, null);

    const image = async () => {
        let response;
        if (_.isObject(url)) {
            response = url;
        } else {
            response = await axios.get(url);
        }

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