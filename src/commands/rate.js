import {removeCommandPart} from "../utility";
import RangeHelper from "../classes/RangeHelper";

const ratings = new RangeHelper([{
    from: 0,
    to: 24,
    value: "not that great..."
}, {
    from: 25,
    to: 49,
    value: "it's okay..."
}, {
    from: 50,
    to: 74,
    value: "pretty good!"
}, {
    from: 75,
    to: 100,
    value: "I love it!"
}]);

export const run = async (message) => {
    const question = removeCommandPart(message.cleanContent);
    const num = Math.floor(Math.random() * 100);

    if (!question) {
        await message.channel.send("Please type something to be rated.");
        return;
    }

    await message.channel.send(`I'd rate **${question}** a solid **${num}/100**, ${ratings.getValue(num)}`);
};