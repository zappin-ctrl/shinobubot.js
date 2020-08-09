import Discord from "discord.js";
import {removeCommandPart} from "../utility";

const roleMap = {
    '688536643497623641': { // Yotsugi
        id: '710516700419719280',
        key: 'a2y5k-L20uSEMhCwhuJdjYrC5uUJgKdEiYy_l6Kc5GTx5k0V1LX4no2T0tVuaqiWKfPr'
    },
    '688536488488861720': { // Senjou
        id: '710515855943008337',
        key: 'oLmkKwAp1XcuuJq-4qS_siMBhqtgJGFrzGyFrE5m3chjJ-iyTOx3MqQpsHl_CErjhgmX'
    },
    '688536542364565522': { // Hanekawa
        id: '710515997366550610',
        key: 'tZOEF8UBCGiNBoXXQ4BUsduAXEcq2FHnzGmPTDAd9LcqO72jPWHympiVCYYTTCqlWsvT'
    },
    '688536468112670733': { // Shinobu
        id: '710516076823183436',
        key: 'BwG8fIdiZi2lZvlQBgsU6Apakoe9AWgQ7jpt18nZxOMu1U9BEPCB4XRStO91jNIBbLZl'
    },
    '688536869939838993': { // Nadeko
        id: '710516396777275472',
        key: 'tUMLqgs7aXaMBeWZEhaOUW7b7k5ufNYMbWyTHXcU5fGeizHCviT9qJRkEYasNWbcN7jV'
    },
    '688536582113722464': { // Tsukihi
        id: '710516815167750194',
        key: '60ZfkC77iYsg5viBZpkmXdjWyW22FeeHTv6e-bdcMNRc-pvRhMQJg8YHqP0be-ZrJByi'
    },
    '688536614397411413': { // Karen
        id: '710516925116973076',
        key: '5a9laqgc8dKNyOlYqJQ-DRv1bkhrdGyk0ONaU2biqN0MUok2RqWifweQxB23YUFiRXoL'
    },
    '688536685725745161': { // Ougi
        id: '710517073545265193',
        key: 'jq3EpVuTSIy7ZE5aWBny9v772UUfb7MO8SI562J9e-qdVmi1mDd6Ns0kFZrfLZ49Vyyy'
    },
    '688536413175808012': { // Hachi
        id: '710517173805908038',
        key: 'UaMr1vOQSiLlZ6XUmBhLlor0c0mOgWJqE0TLlrZKPzDlrW7PaRZpElV1GMkbrhaHsTcG'
    },
    '688536521959407628': { // Kanbaru
        id: '710517484356239432',
        key: 'qr1TEGDnB2qSEORY0S-jL12aAQKgEIY7-st8dKOagxIFvZ1aSGRMyAaHzAoedEfijuQh'
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
    if (message.channel.id === '652432414135681060') {
        for (const key in roleMap) {
            if (message.member.roles.cache.has(key)) {
                const hook = new Discord.WebhookClient(roleMap[key].id, roleMap[key].key);
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