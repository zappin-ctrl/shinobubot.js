import {handleSimplePost} from "../utility";

export const aliases = ['headpat'];
export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://nekos.life/api/v2/img/pat', '$1 gave $2 a pat', '$1 gave themselves a pat');
};
