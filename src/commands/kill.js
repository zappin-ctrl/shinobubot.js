import {handleLocalImagePost} from "../utility";

export const run = async (message, args) => {
    await handleLocalImagePost(message, args, 'killP', '$1 killed $2');
};
