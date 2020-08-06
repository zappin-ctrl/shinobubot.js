import {handleLocalImagePost} from "../utility";

export const run = async (message, args) => {
    await handleLocalImagePost(message, args, 'handP', '$1 held hands with $2', '$1 held their own hand');
};
