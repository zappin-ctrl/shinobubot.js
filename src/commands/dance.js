import {handleSimplePost} from "../utility";

export const run = async (message, args) => {
    await handleSimplePost(message, args, 'https://waifu.pics/api/dance', '$1 is dancing with $2', '$1 is dancing alone');
};
