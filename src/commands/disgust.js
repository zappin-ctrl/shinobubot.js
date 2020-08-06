import {handleLocalImagePost} from "../utility";

export const aliases = ['gross', 'disgusting', 'ew'];
export const run = async (message, args) => {
    await handleLocalImagePost(message, args, 'disgustP', '$1 is disgusted by $2');
};
