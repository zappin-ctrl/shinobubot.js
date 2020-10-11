import {isOwner, loadCommandsFromJson} from "../utility";
import {loadWeebCommands} from "../weeb";

export const run = async (message) => {
    if (isOwner(message)) {
        loadCommandsFromJson();
        loadWeebCommands();
        message.channel.stopTyping();
    }
};
