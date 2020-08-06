import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://rra.ram.moe/i/r?type=pout', '$1 pouts at $2', null, 'path', 'https://rra.ram.moe$1');
};
