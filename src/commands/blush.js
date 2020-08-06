import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://waifu.pics/api/blush', '$1 blushes at $2', '$1 blushed');
};
