import Discord from "discord.js";
import {getUserFromMention} from "../utility";

export const aliases = ["pfp","image","profilepic","pic"];
export const run = async (message, args) => {
    let file = '';
    if (args[0]) {
        const user = getUserFromMention(args[0]);
        if (!user) {
            await message.reply("Please use a proper mention.");
            return;
        }

        file = user.displayAvatarURL({format: "png", dynamic: true, size: 256});
    } else {
        file = message.author.displayAvatarURL({format: "png", dynamic: true, size: 256});
    }

    await message.channel.send({
        files: [{
            attachment: file,
        }]
    });
};

export const help = "Show a user's profile picture";
export const helpArguments = '[@someone/ID]';
export const helpGroup = 'utility';
