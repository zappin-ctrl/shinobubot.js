import { getEmbed } from "../utility";
import client from "../bot";

export const aliases = ["inv"];
export const run = async(message) => {
    const pog = client.guilds.cache.size
    const emb = getEmbed()
        .setDescription(`**[Click this link](https://discord.com/oauth2/authorize?client_id=490901986502377512&scope=bot&permissions=388160) to invite me!**`)
        .setFooter(`Currently in ${pog} servers!`)
        .setColor(`#17ff26`);
    await message.channel.send(emb);
};
export const help = "Invite me to your server!";
export const helpGroup = 'utility';