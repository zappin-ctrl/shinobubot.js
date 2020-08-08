export const run = async (message, args) => {
    const num = Number(args[0]);

    if (!args[0] || Number.isNaN(num)) {
        await message.channel.send("Please enter a number to roll with it as the max");
        return;
    }

    await message.channel.send(`> **${message.author.username}** rolled a `  + `**` + (Math.round(Math.random() * (args[0] - 1) + 1)) + `** / ${args[0]}`)
};

export const help = "Roll between 1 and your number";
export const helpArguments = '[number]';
export const helpGroup = 'fun';