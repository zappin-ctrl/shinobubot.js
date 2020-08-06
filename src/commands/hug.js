import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://nekos.life/api/v2/img/hug', '$1 hugged $2', '$1 hugged themselves');
};
