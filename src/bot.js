import Discord from "discord.js";
import logger from "./logger";
import {setActivity, loadCommandsFromJson, addCommand} from "./utility";
import fs from "fs";
import _ from "lodash";

const client = new Discord.Client();

export const commands = {};
export const commandAliases = {};

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
})

client.on('message', (message) => {
    if (message.author.bot || message.content.indexOf(process.env.PREFIX) !== 0) {
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

    cmd.run(message, args, argsclean, cmd.command);
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
            command: command
        }, exports.aliases);
    }
});
loadCommandsFromJson();

export const customImageList = JSON.parse(fs.readFileSync('./assets/image-list.json', 'utf8'));
export default client;