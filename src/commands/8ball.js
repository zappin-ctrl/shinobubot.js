import {getEmbed, applyMentions} from "../utility";
import axios from "axios";

export const aliases = ['eightball', 'magic8', 'magicball'];
export const run = async (message, args) => {
    let question = args.join(' ');

    if (!question) {
        return message.channel.send("Please ask a **yes / no** question.");
    }

    let feel;
    const response = await axios.get(`https://8ball.delegator.com/magic/JSON/${question}`);

    if (response.data.magic.type === `Affirmative`) {
        feel = process.env.EMOTE_PLUS
    } else if (response.data.magic.type === `Contrary`) {
        feel = process.env.EMOTE_MINUS
    } else {
        feel = process.env.EMOTE_NEUTRAL
    }

    const embed = getEmbed()
        .setThumbnail('https://i.imgur.com/ciZLX5u.png')
        .setDescription(applyMentions(`$1 asks: \n > ${question} \n \n **\`Answer:\`** **${response.data.magic.answer} ${feel}**`, message.author));

    await message.channel.send(embed);
};

export const help = 'Ask a yes/no question and have it answered';
export const helpArguments = '[question]';
export const helpGroup = 'fun';