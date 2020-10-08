import {isOwner} from "../utility";
import spoopy from "../auto/spoopy";

export const run = async (message) => {
    if (!isOwner(message)) {
        return;
    }

    spoopy();
}