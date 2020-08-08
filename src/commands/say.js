import Discord from "discord.js";
import {removeCommandPart} from "../utility";

const roleMap = {
    '688536643497623641': { // Yotsugi
        avatar: 'https://i.imgur.com/TBVj9pH.jpg',
        name: 'Yotsugi Ononoki'
    },
    '688536488488861720': { // Senjou
        avatar: 'https://i.imgur.com/0fixIeo.jpg',
        name: 'Hitagi Senjougahara'
    },
    '688536542364565522': { // Hanekawa
        avatar: 'https://i.imgur.com/s1xYpfE.jpg',
        name: 'Tsubasa Hanekawa'
    },
    '688536468112670733': { // Shinobu
        avatar: 'https://i.imgur.com/0llNMoa.jpg',
        name: 'Shinobu Oshino'
    },
    '688536869939838993': { // Nadeko
        avatar: 'https://i.imgur.com/z3iryOe.jpg',
        name: 'Nadeko Sengoku'
    },
    '688536582113722464': { // Tsukihi
        avatar: 'https://i.imgur.com/4z6NpVp.jpg',
        name: 'Tsukihi Araragi'
    },
    '688536614397411413': { // Karen
        avatar: 'https://i.imgur.com/GrORkZS.jpg',
        name: 'Karen Araragi'
    },
    '688536685725745161': { // Ougi
        avatar: 'https://i.imgur.com/hZaGJQa.jpg',
        name: 'Ougi Oshino'
    },
    '688536413175808012': { // Hachi
        avatar: 'https://i.imgur.com/Z4tZyYR.jpg',
        name: 'Mayoi Hachikuji'
    },
    '688536521959407628': { // Kanbaru
        avatar: 'https://i.imgur.com/PaW9sjP.jpg',
        name: 'Suruga Kanbaru'
    }
}

export const aliases = ['echo'];
export const run = async (message, args) => {
    if (!args[0]) {
        await message.channel.send("Please type something for your waifu to repeat");
        return;
    }

    try {
        message.delete({
            timeout: 3000
        });
    } catch (e) {}

    const say = removeCommandPart(message.cleanContent);
    if (message.channel.guild.id === '652432413586358273') {
        for (const key in roleMap) {
            if (message.member.roles.cache.has(key)) {
                const hook = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);
                await hook.edit({
                    channel: message.channel,
                    avatar: roleMap[key].avatar,
                    name: roleMap[key].name,
                    reason: 'Running say command with waifu'
                });
                await hook.send(say);
                return;
            }
        }
    }

    await message.channel.send(say)
};

export const help = "Have the bot repeat your message";
export const helpArguments = '[sentence]';
export const helpGroup = 'fun';