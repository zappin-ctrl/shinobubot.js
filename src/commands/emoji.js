import {getEmbed} from "../utility";

export const alises = ["emote", "enlarge", "steal"];
export const run = async (message, args) => {
    const emoji = args[0];
    if (!emoji) {
        await message.reply("Please define emoji to search for");
        return;
    }

    const emojiId = emoji.replace(/<a?:(.*?):+/g, '').replace(/>+/g, '');
    let imageUrl = `https://cdn.discordapp.com/emojis/${emojiId}`;
    const embed = getEmbed();
    if (emoji.indexOf('<a:') === 0) {
        imageUrl += '.gif';
        embed.setDescription(`Type: **Animated (.gif)** \n ID: **${emojiId}** \n [View GIF](${imageUrl})`)
            .setImage(imageUrl);
    } else if (emoji.indexOf('<:') === 0) {
        imageUrl += '.png';
        embed.setDescription(`Type: **Image (.png)** \n ID: **${emojiId}** \n [View PNG](${imageUrl})`)
            .setImage(imageUrl);
    } else {
        embed.setDescription("**Something isn't right, please try again.**");
    }

    await message.channel.send(embed);
};