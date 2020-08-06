import {handleSimplePost} from "../utility";

export const aliases = ['smooch'];
export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://nekos.life/api/v2/img/kiss', '$1 kissed $2', '$1 kissed themselves');
};
