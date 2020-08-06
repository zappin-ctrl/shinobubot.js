import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://waifu.pics/api/highfive', '$1 highfived $2', '$1 highfived themselves');
};
