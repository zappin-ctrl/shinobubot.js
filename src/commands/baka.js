import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://nekos.life/api/v2/img/baka', '$1 called $2 a dummy');
};
