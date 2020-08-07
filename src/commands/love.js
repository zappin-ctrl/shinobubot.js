import RangeHelper from "../classes/RangeHelper";
import seedrandom from "seedrandom";
import {getEmbed, getUserFromMention} from "../utility";

const ranges = new RangeHelper([{
    from: 0,
    to: 0,
    value: "You guys aren't event remotely a match..."
}, {
    from: 1,
    to: 25,
    value: "Maybe you're better off as distant friends."
}, {
    from: 26,
    to: 50,
    value: "You guys are friends but I sense no romance."
}, {
    from: 51,
    to: 75,
    value: "There's a connection between the two!"
}, {
    from: 76,
    to: 99,
    value: "Love is in the air <3"
}, {
    from: 100,
    to: 100,
    value: "Such a cute couple <3 <3 <3"
}]);

export const aliases = ["lovecalc", "ship", "calclove"];
export const run = async (message, args) => {
    let userA = getUserFromMention(args[0]);
    if (!userA) {
       await message.channel.send("Please mention a user.");
       return;
    }

    let userB = getUserFromMention(args[1]);
    if (!userB) {
        userB = userA;
        userA = message.author;
    }

    const shipName = userA.username.slice(0, Math.ceil(userA.username.length) / 2) + userB.username.slice(Math.ceil(userB.username.length / 2));
    const x = seedrandom(userA.id + userB.id);
    const result = Math.max(Math.min(Math.round(Math.abs(x()) * 100), 100), 0);

    const embed = getEmbed()
        .setDescription(`<@${userA.id}> and <@${userB.id}>'s love is at **${result}**\n\n> Your shipname is **${shipName}**`)
        .setFooter(ranges.getValue(result))
        .setImage(`https://api.alexflipnote.dev/ship?user=${userA.displayAvatarURL()}&user2=${userB.displayAvatarURL()}`);

    await message.channel.send(embed);
};