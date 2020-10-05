import Wallet from "../orm/identity/Wallet";
import client from "../bot";

export const run = async (message) => {
    const leaderboard = await Wallet.findAll({
        order: [['amount', 'DESC']],
        limit: 10
    });

    if (!leaderboard.length) {
        await message.channel.send("No one on the leaderboard yet! Join the fun!");
        return;
    }

    const lines = [];
    for (let i in leaderboard) {
        try {
            lines.push(`${i+1} - ${client.users.cache.get(leaderboard[i].discordId).username} - ${leaderboard[i].amount}`);
        } catch (e) {}
    }
    await message.channel.send('```py\n' + lines.join("\n") + '```');
};

export const help = 'Check the point leaderboard';
export const helpGroup = 'fun';