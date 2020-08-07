import {requestDb, removeCommandPart} from "../utility";
import moment from "moment";

export const aliases = ["suggest", "suggestion", "idea"];
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