import Discord from "discord.js";
import logger from "./logger";
import {setActivity, loadCommandsFromJson, addCommand, applyMentions, getStringableArray} from "./utility";
import {loadWeebCommands} from "./weeb";
import fs from "fs";
import _ from "lodash";
import CommandStateList from "./orm/settings/CommandStateList";
import {Mutex} from "async-mutex";
import {saveCommandOutputs} from "./data";
import {tryActionMessage} from "./auto/init";

const client = new Discord.Client();

export const commands = {};
export const commandAliases = {};

let commandLockList = {};
const commandLockListMutex = new Mutex();

let cmdUsage = {};

const confirmation_queue = {};

export async function reloadLockList() {
    const release = await commandLockListMutex.acquire();
    commandLockList = {};
    for (let l of await CommandStateList.findAll()) {
        if (!(l.guildId in commandLockList)) {
            commandLockList[l.guildId] = {};
        }

        if (!(l.command in commandLockList[l.guildId])) {
            commandLockList[l.guildId][l.command] = {
                'whitelist': [],
                'blacklist': []
            };
        }

        if (l.isWhitelist && commandLockList[l.guildId][l.command]['whitelist'].indexOf(l.channelId)) {
            commandLockList[l.guildId][l.command]['whitelist'].push(l.channelId);
        } else if (!l.isWhitelist && commandLockList[l.guildId][l.command]['blacklist'].indexOf(l.channelId)) {
            commandLockList[l.guildId][l.command]['blacklist'].push(l.channelId)
        }
    }

    release();
}

export async function askForConfirmation(message, description, callback, timeout = 10000) { // in ms
    if (!(message.guild.id in confirmation_queue)) {
        confirmation_queue[message.guild.id] = {};
    }

    const last = confirmation_queue[message.guild.id][message.author.id];
    if (!_.isUndefined(last)) {
        clearTimeout(last.timeout);
        delete confirmation_queue[message.guild.id][message.author.id]; // delete last action confirmation
    }

    await message.channel.send(`> Are you sure you want to ${description}? Reply with **yes** to do it.`);
    confirmation_queue[message.guild.id][message.author.id] = {
        callback: callback,
        timeout: setTimeout(() => {
            delete confirmation_queue[message.guild.id][message.author.id];
        }, timeout)
    };
}

function logCommands() {
    for (let i in cmdUsage) {
        const cmds = {};
        const readableCmds = [];
        for (let y in cmdUsage[i]) {
            cmds[y] = cmdUsage[i][y];
            readableCmds.push(`${y}: ${cmds[y]}`);
        }

        saveCommandOutputs(i, cmds, process.env.COMMAND_SAVE_TIME / 1000);
        logger.info(`Guild ${i} used commands ${readableCmds.join(", ")} in the last ${process.env.COMMAND_SAVE_TIME / 1000} seconds`);
    }

    cmdUsage = {};
}

function saveCommand(cmd, message) {
    let guild = 'private';

    if (message.guild) {
        guild = message.guild.id;
    }

    if (!(guild in cmdUsage)) {
        cmdUsage[guild] = {};
    }

    if (!(cmd.command in cmdUsage[guild])) {
        cmdUsage[guild][cmd.command] = 0;
    }

    cmdUsage[guild][cmd.command]++;
}

function handleSpecial(cmd, message) {
    if (message.channel.type !== 'dm' &&
        message.guild.id in commandLockList &&
        cmd.command in commandLockList[message.guild.id]) {
        const item = commandLockList[message.guild.id][cmd.command];
        if ((item['whitelist'].length > 0 && item['whitelist'].indexOf(message.channel.id) === -1) ||
            (item['blacklist'].length > 0 && item['blacklist'].indexOf(message.channel.id) !== -1)) {
            message.channel.send(`<@${message.author.id}> command ${cmd.command} is not allowed in this channel.`).then((m) => {
                m.delete({
                    timeout: 5000
                }); // delete this message after 5 seconds
            });

            return true; // don't fire real command
        }
    }

    let messages = null;

    if (!_.isUndefined(cmd.info) && !_.isUndefined(cmd.info.special)) {
        if ('ultimateFailure' in cmd.info.special &&
            'message' in cmd.info.special.ultimateFailure &&
            (messages = getStringableArray(cmd.info.special.ultimateFailure.message)) !== null) {
            const chance = parseInt(cmd.info.special.ultimateFailure.chance ?? 1);

            if (chance >= Math.round(Math.random() * 99) + 1) {
                message.channel.send(applyMentions(_.sample(messages), message.author));
                return true;
            }
        }
    }

    return false;
}

client.on('guildCreate', (guild) => {
    logger.info(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    setActivity(client);
});

client.on('guildDelete', (guild) => {
    logger.info(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    setActivity(client);
});

client.on('ready', () => {
    logger.info(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    setActivity(client);
    reloadLockList();
})

client.on('message', async (message) => {
    if (message.author.bot) {
        return;
    }

    // process confirmation checks
    if (message.cleanContent.toLowerCase() === "yes" &&
        message.guild.id in confirmation_queue &&
        message.author.id in confirmation_queue[message.guild.id]) {
        clearTimeout(confirmation_queue[message.guild.id][message.author.id]);
        confirmation_queue[message.guild.id][message.author.id].callback();
        delete confirmation_queue[message.guild.id][message.author.id];
    }

    if (message.content.indexOf(process.env.PREFIX) !== 0) {
        tryActionMessage(message);

        return;
    }

    // todo: look over this shit later
    const argsclean = message.cleanContent.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cleancommand = argsclean.shift().toLowerCase();
    const command = args.shift().toLowerCase();
    if (cleancommand) {}

    const cmd = commands[command] ?? commands[commandAliases[command]];
    if (!cmd) {
        console.log(`No command ${command} found`);
        return;
    }

    saveCommand(cmd, message);

    if (handleSpecial(cmd, message)) {
        return;
    }

    try {
        cmd.run(message, args, argsclean, cmd.command, command); // last argument is real alias used
    } catch (e) {
        message.channel.send("An error occurred while running the command!");
        logger.error(`An error occurred while running command ${cmd.command}`, e);
    }
});

fs.readdir("./lib/commands", async (err, files) => {
    if (err) {
        logger.error(err);
        return;
    }

    for (let file of files) {
        const exports = await import(`./commands/${file}`);
        if ((!_.isUndefined(exports.disabled) && exports.disabled === true) || !_.isFunction(exports.run)) {
            continue;
        }

        const command = file.substr(0, file.lastIndexOf("."));
        addCommand(command, {
            run: exports.run,
            command: command,
            help: exports.help,
            helpGroup: exports.helpGroup,
            helpArguments: exports.helpArguments,
            helpSimpleGroup: exports.helpSimpleGroup
        }, exports.aliases);
    }
});
loadCommandsFromJson();
loadWeebCommands();

setInterval(logCommands, parseInt(process.env.COMMAND_SAVE_TIME));
export const customImageList = JSON.parse(fs.readFileSync('./assets/image-list.json', 'utf8'));
export default client;