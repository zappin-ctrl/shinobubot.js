import {handleLocalImagePost} from "../utility";

export const run = async (message, args) => {
    await handleLocalImagePost(message, args, 'gropeP', '$1 groped $2', '$1 groped themselves? Ok.');
};
