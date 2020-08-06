import {handleSimplePost} from "../utility";

export const aliases = ['lood'];
export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://rra.ram.moe/i/r?type=lewd', '$1 bonks $2 for being lewd', null, 'path', 'https://rra.ram.moe$1');
};
