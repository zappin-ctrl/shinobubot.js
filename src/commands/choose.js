import _ from "lodash";
export const aliases = ['pick'];

const failMessage = `Please type your options separated with a comma.\n**Example: \`${process.env.PREFIX}choose option 1,option 2,etc\`**`;
export const run = async (message, args, argsclean) => {
    if (!args[0]) {
        await message.channel.send(failMessage);
        return;
    }

    let options = argsclean.join(" ").split(",");
    for (let index in options) {
        options[index] = options[index].trim();
    }
    options = options.filter(val => val);
    if (!options.length) {
        await message.channel.send(failMessage);
        return;
    }

    await message.channel.send(_.sample(options));
};

export const help = "I'll choose one of the options on your behalf";
export const helpArguments = '[op1,op2,etc]';
export const helpGroup = 'fun';
