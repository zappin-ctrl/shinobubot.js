import {loadCommandsFromJson} from "../utility";

export const run = async (message, args) => {
    if (message.author.id === process.env.OWNER || process.env.OWNER === 'any') {
        loadCommandsFromJson();
    }
};
