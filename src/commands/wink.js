import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://waifu.pics/api/wink', '$1 winked at $2', '$1 is winking');
};
