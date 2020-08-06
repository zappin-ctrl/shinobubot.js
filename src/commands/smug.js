import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://nekos.life/api/v2/img/smug', '$1 smugs at $2', '$1 is feeling smug');
};
