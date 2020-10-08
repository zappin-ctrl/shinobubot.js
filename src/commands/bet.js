import Wallet from "../orm/identity/Wallet";
import {safeGetUsername} from "../utility";

const BET_MAX = 1000;
export const run = async (message, args) => {
    const amount = parseInt(args[0]);

    if (!args[0] || isNaN(amount) || amount <= 0) {
        await message.channel.send(`You need to specify how much you wanna bet!`);
        return;
    }

    if (amount > BET_MAX) {
        await message.channel.send(`Betting max is ${BET_MAX}!`);
        return;
    }

    const wallet = await Wallet.findOne({where: {discordId: message.author.id}});
    if (null === wallet || wallet.amount < amount) {
        await message.channel.send(`You can't bet this much! You have ${(null === wallet ? 0 : wallet.amount)} points!`);
        return;
    }

    const win = Math.random() >= 0.5;
    if (win) {
        wallet.amount += amount;
        await wallet.save();
        await message.channel.send(`You win ${amount} points!`);
    } else {
        wallet.amount -= amount;
        await wallet.save();
        const lowest = await Wallet.findOne({order: [['amount', 'ASC']]});
        if (null === lowest || lowest.discordId === wallet.discordId) {
            await message.channel.send(`You lose ${amount} points! They're off to somewhere!`);
        } else {
            lowest.amount += amount;
            await lowest.save();
            await message.channel.send(`You lose ${amount} points! ${safeGetUsername(lowest.discordId)} takes them away!`);
        }
    }
};

export const help = "Bet some points!";
export const helpArguments = '[amount/int]';
export const helpGroup = 'fun';
