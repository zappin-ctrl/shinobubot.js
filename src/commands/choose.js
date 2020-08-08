export const aliases = ['pick'];
export const run = async (message, args, argsclean) => {
    if (!args[0]) {
        await message.channel.send(`Please type your options separated with a comma.\n**Example: \`${process.env.PREFIX}choose option 1,option 2,etc\`**`);
        return;
    }

    const options = argsclean.join(" ").split(",");
    let optfix = options[Math.floor(Math.random() * options.length)]
    if (optfix == ""|| optfix == " ") {
      optfix = "empty"
    }

    await message.channel.send(optfix);
};

export const help = "I'll choose one of the options on your behalf";
export const helpArguments = '[op1,op2,etc]';
export const helpGroup = 'fun';
