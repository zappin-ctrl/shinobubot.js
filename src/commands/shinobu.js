//import Discord from "discord.js";
import axios from "axios";
import {getEmbed} from "../utility";

export const aliases = ['nobu', 'kissshot'];
export const run = async (message, args) => {
    let response;
    const question = args.join('_');
    try {
        response = await axios.get(`https://waifu.pics/api/shinobu`);
        const result = response.data.url;
        //const attachment = new Discord.MessageAttachment(result, 'shinobu.jpg');
        //await message.channel.send(attachment)
        //another way to do it, might switch to it idk
        await message.channel.send(
            getEmbed()
                .setImage(result)
        ); 
    } catch (e) {
        await message.channel.send("Something went wrong, please try again.");
        return;
    }
};

export const help = "Send a random picture of Shinobu Oshino!";
export const helpGroup = 'utility';