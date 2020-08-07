import {isOwner, loadCommandsFromJson} from "../utility";

export const run = async (message) => {
    if (isOwner(message)) {
        loadCommandsFromJson();
    }
};
