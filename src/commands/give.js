import Wallet from "../orm/identity/Wallet";
import TransferLog from "../orm/identity/TransferLog";
import {askForConfirmation} from "../bot";
import {getUserFromMention} from "../utility";
import _ from "lodash";

async function doTransfer(message, user, amount) {
    const wallet = await Wallet.findOne({where: {discordId: message.author.id}});
    if (null === wallet || (amount !== 'all' && wallet.amount < amount)) {
        await message.channel.send("You don't have enough points to give");
        return;
    }

    const [receiver, created] = await Wallet.findOrCreate({
        where: {discordId: user.id},
        defaults: {discordId: user.id}
    });
    amount = (amount === 'all' ? wallet.amount : amount);
    receiver.amount += amount;
    wallet.amount -= amount;
    await wallet.save();
    await receiver.save();
    await TransferLog.create({sender: message.author.id, receiver: user.id, amount: amount});
    await message.channel.send(`You've successfully gifted ${amount} points to <@${user.id}>!`);
}

export const run = async (message, args) => {
    const user = await getUserFromMention(args[0], message);
    const amount = args[1] === 'all' ? 'all' : parseInt(args[1]);

    console.log(user);
    console.log(amount);

    if (!user || (amount !== 'all' && (_.isNull(amount) || amount < 0))) {
        await message.channel.send("You need to specify a valid user and amount!");
        return;
    }

    const wallet = await Wallet.findOne({where: {discordId: message.author.id}});
    if (null === wallet || (amount !== 'all' && wallet.amount < amount)) {
        await message.channel.send("You don't have enough points to give");
        return;
    }

    await askForConfirmation(message, `give ${amount} points to <@${user.id}>`, doTransfer.bind(null, message, user, amount));
};