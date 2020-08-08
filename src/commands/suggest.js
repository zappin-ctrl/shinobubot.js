import {requestDb, removeCommandPart} from "../utility";
import moment from "moment";

export const aliases = ["request", "suggestion", "idea"];
export const run = async (message, args) => {
    if (!args[0]) {
        await message.reply(" you need to provide a request/suggestion.");
        return;
    }

    await requestDb.get('requests').push({
        author: message.author.username,
        userid: message.author.id,
        request:removeCommandPart(message.cleanContent),
        date: moment().format()
    }).write();
    await message.reply(` your request/suggestion has been recorded ${process.env.EMOTE_VERIFIED}`);
};

export const help = "Send a suggestion for the bot";
export const helpArguments = '[sentence]';
export const helpGroup = 'utility';