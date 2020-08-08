import RangeHelper from "../classes/RangeHelper";
import {getEmbed, getUserFromMention, applyMentions} from "../utility";

const ratings = new RangeHelper([{
    from: 0,
    to: 0,
    value: "You're straight! Congrats!"
}, {
    from: 1,
    to: 24,
    value: "Not that gay tbh"
}, {
    from: 25,
    to: 49,
    value: "Kinda gay I guess"
}, {
    from: 50,
    to: 74,
    value: "Pretty damn gay"
}, {
    from: 75,
    to: 100,
    value: "So gay it hurts oof"
}, {
    from: 101,
    to: 200,
    value: "You're beyond gay wow"
}, {
    from: 201,
    to: 206,
    value: "Gay beyond what is cosmically known..."
}, {
    from: 207,
    to: 207,
    value: "GAY OVERLORD OF CUM"
}]);

export const run = async (message, args) => {
    let user = message.author;
    if (args[0]) {
        user = getUserFromMention(args[0]);

        if (!user) {
            await message.channel.send("Please use a proper mention");
            return;
        }
    }

    const result =  Math.round(Math.abs((((Math.cos(user.id)) * Math.PI) * 0.5) + 0.5) * 100);
    const embed = getEmbed()
        .setFooter(ratings.getValue(result))
        .setImage(`http://www.yarntomato.com/percentbarmaker/button.php?barPosition=${result}&leftFill=%23FF99FF`);

    if (user.id === message.author.id) {
        embed.setDescription(`You're **${result}%** gay! ${process.env.EMOTE_DANCE}`);
    } else {
        embed.setDescription(applyMentions(`$1 is **${result}%** gay! ${process.env.EMOTE_DANCE}`, user));
    }

    await message.channel.send(embed);
};

export const help = "Find out yours or your friends' gay potential";
export const helpArguments = '[@someone/ID]';
export const helpGroup = 'fun';