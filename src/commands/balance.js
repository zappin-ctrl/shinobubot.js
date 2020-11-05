import Wallet from "../orm/identity/Wallet";

export const aliases = ["bal", "wallet", "points"];
export const run = async(message) => {
    const wallet = await Wallet.findOne({ where: { discordId: message.author.id, guildId: message.guild.id } });

    await message.channel.send(`> **<@${message.author.id}>**, you have **${(null === wallet ? 0 : wallet.amount)}** points!`);
};

export const help = "Check your balance in the running event!";
export const helpGroup = 'fun';