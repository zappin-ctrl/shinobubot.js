import {handleLocalImagePost} from "../utility";

export const aliases = ['noswearing'];
export const run = async (message, args) => {
    await handleLocalImagePost(message, args, 'noswearP', '$1, please no swearing $2');
};
