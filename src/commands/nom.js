import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://waifu.pics/api/nom', '$1 nommed $2');
};
