import {handleLocalImagePost} from "../utility";

export const aliases = ['nobulli'];
export const run = async (message, args) => {
    await handleLocalImagePost(message, args, 'nobullyP', '$1 please no bulli $2');
};
