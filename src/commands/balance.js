import Wallet from "../orm/identity/Wallet";

export const run = async (message) => {
    const wallet = await Wallet.findOne({where: {discordId: message.author.id}});

    await message.channel.send(`You have ${(null === wallet ? 0 : wallet.amount)} points!`);
};

export const help = "Check your balance!";
export const helpGroup = 'fun';