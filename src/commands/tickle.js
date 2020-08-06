import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://nekos.life/api/v2/img/tickle', '$1 tickled $2', '$1 tickled themselves');
};
