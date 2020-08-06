import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://waifu.pics/api/bite', '$1 bit $2', '$1 bit themselves');
};
