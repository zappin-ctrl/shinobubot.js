import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://nekos.life/api/v2/img/cuddle', '$1 cuddled with $2', '$1 cuddled with themselves');
};
