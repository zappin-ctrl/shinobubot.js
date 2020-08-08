import {getUserFromMention, sleep} from "../utility";

const startQuote = [
    "Getting ready to rumble",
    "On your marks, get set, go",
    "There's a brawl brewing",
    "The stage is set, fight",
    "This one's for Knack 2 baby",
    "This is a battle for the legends",
    "Let's fucking GOOOOOO",
    "Winner is chad, loser is incel"
];

const endQuote = [
    `$2 is the winner! **R.I.P. $1** ${process.env.DEAD_EMOTE}`,
    `$1 is the winner! **R.I.P. $2** ${process.env.DEAD_EMOTE}`
];

export const aliases = ["battle", "vs"];
export const run = async (message, args) => {
    if (args[0]) {
        const user = getUserFromMention(args[0]);
        if (!user) {
            await message.reply('Please use a proper mention.');
            return;
        } else if (user.id === message.author.id) {
            await message.channel.send(`<@${message.author.id}> killed themselves ${process.env.DEAD_EMOTE}`);
            return;
        }

        const post = await message.channel.send(process.env.LOADING_EMOTE + " " + startQuote[Math.floor(Math.random() * startQuote.length)] + " . . .");
        const result = endQuote[Math.floor(Math.random() * endQuote.length)]
            .replace('$1', `<@${message.author.id}>`)
            .replace('$2', `<@${user.id}>`);

        await sleep(3000);
        await post.edit(result);
    }
};

export const help = "Fight someone and let fate decide who lives and who dies";
export const helpArguments = '[@someone/ID]';
export const helpGroup = 'fun';