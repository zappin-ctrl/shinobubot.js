import {isOwner} from "../utility";

export const run = (message) => {
    if (isOwner(message)) {
        process.exit();
    }
}