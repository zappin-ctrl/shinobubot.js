import {getEmbed, getEmoji} from "../utility";

export const aliases = ["emoji", "enlarge", "steal"];
export const run = async (message, args) => {
    const emoji = args[0];
    if (!emoji) {
        await message.reply("Please define emoji to search for");
        return;
    }

    const embed = getEmbed();
    try {
        const [animated, imageUrl, emojiId] = getEmoji(emoji);
        embed.setImage(imageUrl);
        if (animated) {
            embed.setDescription(`Type: **Animated (.gif)** \n ID: **${emojiId}** \n [View GIF](${imageUrl})`);
        } else {
            embed.setDescription(`Type: **Image (.png)** \n ID: **${emojiId}** \n [View PNG](${imageUrl})`);
        }
    } catch {
        embed.setDescription("**Something isn't right, please try again.**");
    }

    await message.channel.send(embed);
};

export const help = "Enlarge an emote (so you can steal it)";
export const helpArguments = '[emote]';
export const helpGroup = 'utility';
